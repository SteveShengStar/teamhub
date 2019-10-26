const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextapp = next({ dev });
const api = require('./backend/index');

nextapp.prepare().then(() => {
    const server = express();

    server.use('/api', api);

    server.all('*', nextapp.getRequestHandler());

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});