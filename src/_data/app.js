module.exports = {
  url: process.env.URL || 'https://localhost:8080',
  title: 'Записките на Иван',
  description:
    'Тези, които търсят истината, винаги трябва да бъдат предпочитани пред онези, които твърдят, че вече са я открили',
  language: 'bg',
  dir: 'ltr',
  repo: 'https://github.com/mnmlivan/mnmlivan.xyz',
  social: {
    github: 'https://github.com/mnmlivan',
    mastodon: 'https://indieweb.social/@mnmlivan',
  },
  author: {
    name: 'mnmlivan',
    email: 'mnmlivan@pm.me',
    url: 'https://mnmlivan.xyz',
    avatar: '/assets/img/avatar.png',
  },
  endpoint: {
    auth: '',
    token: '',
    indieauth: '',
    micropub: '',
    microsub: '',
    webmention: '',
    pingback: '',
  },
};
