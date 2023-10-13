require('dotenv/config');

const { nextDev } = require("next/dist/cli/next-dev");

process.env.NEXT_CPU_PROF = 1;

nextDev({ _: [], "--port": +process.env.DEV_PORT || 3000 });