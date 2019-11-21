const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const { port } = require('./config');
const dev = process.env.NODE_ENV !== 'production';
const nextapp = next({ dev });
const api = require('./backend/index');

nextapp.prepare().then(() => {
    const server = express();

    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());

    server.use('/api', api);

    server.all('*', nextapp.getRequestHandler());

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
