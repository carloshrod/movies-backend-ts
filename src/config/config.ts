import 'dotenv/config';

const config = {
  CLOUD: {
    NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.CLOUD_API_KEY,
    API_SECRET: process.env.CLOUD_API_SECRET
  },
  DATABASE_URL: process.env.DATABASE_URL,
  TEMP_FILES_PATH: process.env.TEMP_FILES_PATH,
  MOVIES_POSTERS_FOLDER: process.env.MOVIES_POSTERS_FOLDER,
  HOST: process.env.HOST
};

export default config;
