import express from 'express';
export const members = express.Router();

members.post('/', async (req, res, next) => {
    try {
        //const authStatus = await data.auth.checkAnyUser(req.headers['authorization'], res);
        console.log('req1!');
        const authStatus = true;
        // if (authStatus) {
        //     res.setHeader('Content-Type', 'application/json');
        //     res.statusCode = 200;
        //     res.end(JSON.stringify(await data.util.resWrapper(async () => {
        //         let fields = null;
        //         if (req.body.fields) {
        //             fields = {};
        //             for (const field of req.body.fields) {
        //                 fields[field] = 1;
        //             }
        //         }
        //         return await data.members.getAll(fields);
        //     })));
        // }
        res.status(200).send('TeamHub Members API.');
    } catch (err) {
        return next(err);
    }
});