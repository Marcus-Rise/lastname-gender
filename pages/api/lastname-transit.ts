import type { NextApiHandler } from "next";
import { runMiddleware } from "../../src/server";
import Cors from "cors";
import type { ILastnameTransitionInfo } from "../../src/lastname";
import { Form } from "multiparty";

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

  const files = await new Promise<IFormDataFile[]>((resolve, reject) => {
    form.parse(req, (err, fields, files: Record<string, IFormDataFile[]>) => {
      if (err) {
        reject(err);
      } else {
        resolve(files.file);
      }
    });
  });

  console.debug(files);

  res.json([]);
};

const config = {
  api: {
    bodyParser: false,
  },
};

export { config };
export default LastnameTransitHandler;
