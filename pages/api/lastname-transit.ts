import type { NextApiHandler } from "next";
import { runMiddleware } from "../../src/server";
import Cors from "cors";
import type { ILastnameTransitionInfo } from "../../src/lastname";
import { LastnameTransit } from "../../src/lastname";
import { Form } from "multiparty";
import fs from "fs";

interface IFormDataFile {
  fieldName: string;
  originalFilename: string;
  path: string;
  headers: Record<string, string>;
  size: number;
}

const LastnameTransitHandler: NextApiHandler<ILastnameTransitionInfo[]> = async (req, res) => {
  await runMiddleware(
    req,
    res,
    Cors({
      methods: ["POST"],
    }),
  );

  const form = new Form();

  const { files, resultAsFile } = await new Promise<{ files: IFormDataFile[]; resultAsFile: boolean }>(
    (resolve, reject) => {
      form.parse(req, (err, fields: Record<string, string[]>, files: Record<string, IFormDataFile[]>) => {
        if (err) {
          reject(err);
        } else {
          resolve({ files: files.file, resultAsFile: fields.returnFile ? fields.returnFile[0] === "true" : false });
        }
      });
    },
  );

  const lastnames: string[] = [];

  await Promise.all(
    files.map(async (i) => {
      const fileData = await new Promise<string>((resolve, reject) =>
        fs.readFile(i.path, "utf8", (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }),
      );

      lastnames.push(...fileData.split("\n").filter((lastname) => !!lastname));
    }),
  );

  const transitions = lastnames.map((i) => LastnameTransit(i));

  res.json(transitions);
};

const config = {
  api: {
    bodyParser: false,
  },
};

export { config };
export default LastnameTransitHandler;
