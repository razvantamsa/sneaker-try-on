module.exports = {
  apps: [
    {
      name: "backend",
      script: "dist/main.js",
      instances: "1",
      exec_mode: "cluster",
      node_args: "--max-old-space-size=512 --nouse-idle-notification",
      args: "--max-old-space-size=512 --nouse-idle-notification",
    },
  ],
};
