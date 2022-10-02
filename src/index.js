import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

export default (url, directoryPath) => {
  const fileName = url
    .replaceAll(/(https:\/\/|http:\/\/|\W)/g, '-')
    .slice(1)
    .concat('.html');
  const filepath = path.join(directoryPath, fileName);
  return axios
    .get(url)
    .then((data) => fs.writeFile(filepath, data.data))
    .then(() => filepath)
    .catch((e) => {
      throw new Error(e);
    });
};
