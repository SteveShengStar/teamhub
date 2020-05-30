const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const { port } = require('./config');
const dev = process.env.TEAMHUB_ENV !== 'production';
const nextapp = next({ dev });
const data = require('./backend/data/index');
const handle = nextapp.getRequestHandler();
const backend = require('./backend');
const express = require('express');

nextapp.prepare().then(async () => {
    await data.init();
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api', backend);

    app.get('*', (req, res) => {
        const parsedUrl = parse(req.url, true);
        return handle(req, res, parsedUrl);
    });

    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.sendStatus(500);
    });

    app.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
