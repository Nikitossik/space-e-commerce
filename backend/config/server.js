const cronTasks = require("./functions/cron");

module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  // url: "https://api.space.in.ua",
  proxy: env.bool("IS_PROXIED", true),
  app: {
    keys: env.array("APP_KEYS"),
  },
  cron: {
    enabled: Object.entries(cronTasks).length > 0,
    tasks: cronTasks,
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});
