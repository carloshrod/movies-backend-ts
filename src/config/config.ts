import 'dotenv/config';

const config = {
  CLOUD: {
    NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.CLOUD_API_KEY,
    API_SECRET: process.env.CLOUD_API_SECRET,
    FOLDER: process.env.CLOUD_FOLDER
  },
  HOST: process.env.HOST,
  TEMP_FILES_PATH: process.env.TEMP_FILES_PATH,
  DATABASE_URL: process.env.DATABASE_URL
};

export default config;
