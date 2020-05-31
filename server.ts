import { parse } from 'url';
import next from 'next';

import data from './backend/data';
import { router as backendRouter } from './backend';
import express from 'express'
import { port } from './config';

const dev = process.env.TEAMHUB_ENV !== 'production';
const nextapp = next({ dev });
const handle = nextapp.getRequestHandler();

nextapp.prepare().then(async () => {
    await data.init();
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api', backendRouter);

    app.get('*', (req, res) => {
        const parsedUrl = parse(req.url, true);
        return handle(req, res, parsedUrl);
    });

    app.use((err: Error, req: express.Request, res: express.Response) => {
        console.error(err.stack);
        res.sendStatus(500);
    });

    app.listen(port, (err: Error) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
