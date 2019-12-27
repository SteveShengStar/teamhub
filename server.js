const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const { port } = require('./config');
const dev = process.env.NODE_ENV !== 'production';
const nextapp = next({ dev });
const data = require('./backend/data/index');
const handle = nextapp.getRequestHandler();

nextapp.prepare().then(async () => {
    console.log(process.env.MONGO_URL);
    await data.init();
    createServer((req, res) => {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
