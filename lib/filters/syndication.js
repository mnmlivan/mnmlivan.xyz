module.exports = (string) => {
  if (!string) {
    return;
  }
  string = String(string);
  const { hostname } = new URL(string);
  hostname.replace(/(?:www\.)?/g, '');

  switch (hostname) {
    case 'indieweb.social':
      return 'Mastodon';
    case 'pixelfed.social':
      return 'Pixelfed';
    case 'instagram.com':
      return 'Instagram';
    default:
      return hostname;
  }
};
