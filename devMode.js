require('dotenv/config');

const { nextDev } = require("next/dist/cli/next-dev");

nextDev({ _: [], "--port": +process.env.DEV_PORT || 3000 });