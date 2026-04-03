/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en", "ru"],
  },
};
