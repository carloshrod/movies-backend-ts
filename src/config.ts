import 'dotenv/config';

const config = {
  cloud: {
    name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
  },
  DATABASE_URL: process.env.DATABASE_URL,
  TEMP_FILES_PATH: process.env.TEMP_FILES_PATH
};

export default config;
