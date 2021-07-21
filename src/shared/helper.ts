import { Request } from 'express';
import { extname } from 'path';
import { unlink } from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(unlink);

export class Helper {
  static customFilename(req: Request, file: Express.Multer.File, cb: any) {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    const nameFile = cb(null, `${randomName}${extname(file.originalname)}`);
    return nameFile;
  }

  static async removeFile(file: string) {
    //const filePath = file.destination + '/' + file.filename;

    try {
      await unlinkAsync(file);
    } catch (err) {
      throw new Error(err);
    }

    return 'sucesso';
  }
}
