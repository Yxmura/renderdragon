import express from 'express';
import cors from 'cors';
import { Readable } from 'stream';
import infoHandler from './api/info.js';
import downloadHandler from './api/download.js';
import downloadThumbnailHandler from './api/downloadThumbnail.js';
import generateTitlesHandler from './api/generateTitles.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const createAdapter = (handler) => (req, res) => {
    const vercelReq = {
      method: req.method,
      headers: req.headers,
      body: req.body,
      url: `http://${req.headers.host}${req.originalUrl}`,
    };

    handler(vercelReq).then(response => {
        if (!response) {
            if (!res.headersSent) {
                res.status(500).send("Handler returned no response.");
            }
            return;
        }

        res.status(response.status);
        response.headers.forEach((value, key) => {
            res.setHeader(key, value);
        });

        if (response.body) {
            Readable.fromWeb(response.body).pipe(res);
        } else {
            res.end();
        }
    }).catch(error => {
        console.error("Handler error:", error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
};

app.all('/api/info', createAdapter(infoHandler));
app.all('/api/download', createAdapter(downloadHandler));
app.all('/api/downloadThumbnail', createAdapter(downloadThumbnailHandler));
app.all('/api/generateTitles', createAdapter(generateTitlesHandler));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
}); 