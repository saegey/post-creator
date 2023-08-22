import zlib from 'zlib';

const uncompress = async (input: any) => {
  return new Promise((resolve, reject) => {
    return zlib.gunzip(
      Buffer.from(input, 'base64'),
      (err: any, buffer: any) => {
        if (!err) {
          const widgetString = buffer.toString('utf-8');
          resolve(widgetString);
        } else {
          reject(err);
        }
      }
    );
  });
};

export { uncompress }