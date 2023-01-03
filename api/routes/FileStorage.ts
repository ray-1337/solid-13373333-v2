import { Router, Request } from "express";
import { fetch as request } from "undici";
import formidable from "formidable";
import {RateLimiterMemory} from "rate-limiter-flexible";

const postLimitation = new RateLimiterMemory({
  duration: 60,
  points: 3 // 3 files per minute of session
});

const router = Router();

let mimeType: Record<string, string> = {
  // static
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/webp": "webp",
  "image/tiff": "tiff",

  // animated
  "video/mp4": "mp4",
  "video/mpeg": "mpeg",
  "video/webm": "webm",
  "image/gif": "gif",

  // misc
  "audio/mpeg": "mp3",
  "application/pdf": "pdf",
  "audio/wav": "wav",
  "application/zip": "zip",
  "audio/aac": "aac",
  "audio/flac": "flac"
};

router
.get("/mime", (_, res) => res.status(200).json(Object.keys(mimeType)))
.get("/", (_, res) => res.sendStatus(200))
.post("/", async (req, res) => {
  try {
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
        const currentIP = getIP(req);

        if (!process.env.STORAGE_ZONE_PASS) {
          return res.status(500).send("unable to retrieve private key from backend");
        };

        if (!part?.mimetype || !mimeType[part.mimetype]) {
          return res.status(403).send("forbidden file type.");
        };
          
        finaleBufs = Buffer.concat(bufs);

        const randomFileName = generateString(randomNumber(8, 16)) + "." + mimeType[part.mimetype];
      
        try {
          await request(`https://se.storage.bunnycdn.com/${process.env.STORAGE_ZONE_NAME}/${randomFileName}`, {
            method: 'PUT',
            body: finaleBufs,
            headers: {
              "AccessKey": process.env.STORAGE_ZONE_PASS,
              "content-type": "application/octet-stream"
            }
          });

          if (currentIP) {
            try {
              await postLimitation.consume(currentIP);
            } catch {
              return res.status(429).send("limited request. please try again.")
            };
          };
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

function getIP(req: Request) {
  return String(req.headers['cf-connecting-ip'] || "") ||
    String(req.headers['x-forwarded-for'] || "").replace(/:\d+$/, '') ||
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress;
};