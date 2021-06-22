const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const express = require('express')


const { port } = require('./config');
const dev = process.env.TEAMHUB_ENV !== 'production';
const nextapp = next({ dev });
const data = require('./backend/data/index');
const handle = nextapp.getRequestHandler();
const api = require('./pages/api');

nextapp.prepare().then(async () => {
    const server = express()
    server.use('/pages/api', api);
    
    await data.init(); // Init Database and establish DB connection
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
        
    // server.listen(3000, (err) => {
    //     if (err) throw err
    //     console.log('> RReady on http://localhost:3000')
    // })
// })
// .catch((ex) => {
//     console.error(ex.stack)
//     process.exit(1)
// })
