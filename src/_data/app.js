module.exports = {
  url: process.env.URL || 'https://localhost:8080',
  title: 'Записките на Иван',
  description:
    'Тези, които търсят истината, винаги трябва да бъдат предпочитани пред онези, които твърдят, че вече са я открили',
  language: 'bg',
  dir: 'ltr',
  theme: {
    light: 'hsl(220, 20%, 100%)',
    dark: 'hsl(220, 20%, 10%)',
    favicon: '/assets/icons/favicon.ico',
    icon: '/assets/icons/icon.svg',
    touchicon: '/assets/icons/icon.png'
  },
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
