/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://justdubai.com",
  generateRobotsTxt: true,
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en", "ru"],
  },
};
