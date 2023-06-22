import fileUpload from 'express-fileupload';
import config from '../config';

const uploadFile = fileUpload({
  useTempFiles: true,
  tempFileDir: config.TEMP_FILES_PATH
});

export default uploadFile;
