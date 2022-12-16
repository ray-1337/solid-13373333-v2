import { Router } from "express";
import { fetch as request } from "undici";
// import { PassThrough } from 'node:stream';
import formidable from "formidable";

const router = Router();

router
.get("/", (_, res) => res.sendStatus(200))
.post("/", async (req, res) => {
  try {
    if (!process.env.STORAGE_ZONE_PASS) {
      return res.status(500).send("unable to retrieve private key from backend");
    };

    let mimeType: Record<string, string> = {
      "image/jpg": "jpg",
      "image/jpeg": "jpeg",
      "image/png": "png",
      "image/webp": "webp",
      "video/mp4": "mp4",
      "video/mpeg": "mpeg",
      "video/webm": "webm",
      "image/gif": "gif"
    };

    const maxFileMB = 100 * 1024 * 1024; // 100 MB
    const form = formidable({
      multiples: false,
      encoding: "utf-8",
      maxFileSize: maxFileMB
    });

    // const parsedPart = new PassThrough();
    let bufs: any[] = [];
    let finaleBufs!: Buffer;
    form.onPart = (part) => {
      part.on('data', (buffer) => {
        bufs.push(buffer);
      });

      part.on('end', async () => {
        if (!part?.mimetype || !mimeType[part.mimetype]) {
          return res.status(403).send("forbidden file type.");
        };
        
        finaleBufs = Buffer.concat(bufs);

        const randomFileName = generateString(randomNumber(8, 16)) + "." + mimeType[part.mimetype];
      
        try {
          await request(`https://se.storage.bunnycdn.com/${process.env.STORAGE_ZONE_NAME}/${randomFileName}`, {
            method: 'PUT',
            body: finaleBufs,
    
            // @ts-expect-error
            headers: {
              "AccessKey": process.env.STORAGE_ZONE_PASS,
              "content-type": "application/octet-stream"
            }
          });
        } catch (error) {
          console.error(error);
          return res.status(500).send("something went wrong from the backend.");
        };
  
        return res.status(200).send(`https://cdn.13373333.one/${randomFileName}`);
      });
    };

    form.parse(req);
  } catch (error) {
    console.error(error);
    return res.status(500).send("something went wrong in the background");
  };
});

export default router;

function generateString(length: number) {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
  return [...Array(length || 16)].map(_ => characters[~~(Math.random() * characters.length)]).join('');
};

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min));
};