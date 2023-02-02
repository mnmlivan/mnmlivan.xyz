module.exports = function attributionPlugin(md, options) {
  var TokenType = {
    BLOCKQUOTE_OPEN: 'blockquote_open',
    BLOCKQUOTE_CLOSE: 'blockquote_close',
  };

  var Defaults = {
    marker: '—', // EM dash
    removeMarker: false,
  };

  var assign = md.utils.assign;

  options = assign({}, Defaults, options);

  function isInteger(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
  }

  function isEmpty(str) {
    return !str || str.length === 0 || str.trim().length === 0;
  }

  function has(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  function startsWith(str, needle) {
    return str.slice(0, needle.length) === needle;
  }

  function trimStart(str) {
    return str.replace(/^\s+/, '');
  }

  function trimEnd(str) {
    return str.replace(/\s+$/, '');
  }

  function insertAt(array, items, position) {
    for (var i = 0, l = items.length; i < l; i++) array.splice(position + i, 0, items[i]);
  }

  function remove(array, from, to) {
    from = isInteger(from) ? from : 0;
    to = isInteger(to) ? to : array.length - 1;

    var amount = to - from;
    var items = array.splice(from, amount);

    return items.length;
  }

  function matches(obj, props) {
    for (var prop in props) if (has(props, prop) && props[prop] !== obj[prop]) return false;

    return true;
  }

  function findToken(tokens, props, position) {
    position = isInteger(position) ? position : 0;

    for (var i = position, l = tokens.length; i < l; i++) if (matches(tokens[i], props)) return i;

    return -1;
  }

  function findMarker(str, marker) {
    if (startsWith(str, marker)) return 0;

    var length = marker.length;
    var position = str.indexOf('\n' + marker, length + 1);

    return position > length ? position + 1 : -1;
  }

  function rule(state) {
    var tokens = state.tokens;

    for (var i = 0, l = tokens.length; i < l; i++) {
      var start = findToken(tokens, { type: TokenType.BLOCKQUOTE_OPEN }, i);

      if (start === -1) continue;

      var level = tokens[start].level;
      var end = findToken(tokens, { type: TokenType.BLOCKQUOTE_CLOSE, level: level }, start + 1);

      if (end === -1) continue;

      for (var j = start; j <= end; j++) tokens[j].level++;

      var position = -1;
      if (findMarker(tokens[end - 2].content, options.marker) !== -1) position = end - 2;

      if (position !== -1) {
        var token = tokens[position];
        var source = token.content;

        var index = findMarker(source, options.marker);

        var content = index > 0 ? trimEnd(source.slice(0, index)) : null;
        var attribution = index > 0 ? source.slice(index) : source;
        token.content = content;

        if (isEmpty(content)) end -= remove(tokens, position - 1, position + 2);

        var captionOpen = new state.Token('blockquote_attribution_open', 'figcaption', 1);
        captionOpen.block = true;
        captionOpen.level = level + 1;

        var caption = new state.Token('inline', '', 0);
        caption.children = [];
        caption.level = level + 2;
        caption.content = options.removeMarker ? trimStart(attribution.slice(options.marker.length)) : attribution;

        var captionClose = new state.Token('blockquote_attribution_close', 'figcaption', -1);
        captionClose.block = true;
        captionClose.level = level + 1;

        insertAt(tokens, [captionOpen, caption, captionClose], end + 1);
      }

      var figureOpen = new state.Token('blockquote_container_open', 'figure', 1);
      figureOpen.attrJoin('class', 'quote');
      figureOpen.block = true;
      figureOpen.level = level;

      var figureClose = new state.Token('blockquote_container_close', 'figure', -1);
      figureClose.block = true;
      figureClose.level = level;

      insertAt(tokens, [figureClose], position !== -1 ? end + 4 : end + 1);
      insertAt(tokens, [figureOpen], start);

      i = end + 5;

      l = l + 4;
    }
  }

  md.core.ruler.after('block', 'attribution', rule);
};
