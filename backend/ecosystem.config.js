module.exports = {
  apps: [
    {
      name: "api-space-in-ua",
      script: "npm",
      args: "start",
      cwd: "/var/www/backend-space",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "/var/www/backend-space/log/errors.log",
      out_file: "/var/www/backend-space/log/access.log",
      merge_logs: true,
    },
  ],
};
