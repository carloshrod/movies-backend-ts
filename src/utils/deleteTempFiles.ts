import fs from 'fs-extra';
import config from '../config/config';

const deleteTempFiles = async (): Promise<void> => {
  if (config.TEMP_FILES_PATH) {
    const files = await fs.readdir(config.TEMP_FILES_PATH);
    if (files.length > 0) {
      await fs.emptyDir(config.TEMP_FILES_PATH);
      console.log('Temp files deleted successfully!');
    }
  }
};

export default deleteTempFiles;
