require('dotenv/config');

const { nextDev } = require("next/dist/cli/next-dev");

process.env.NODE_ENV = "development";

nextDev({ _: [], "--port": +process.env.DEV_PORT || 3000 });