const data = require('../../../../backend/data/index');
const cookie = require('cookie');


module.exports = async (req, res) => {
    await data.initIfNotStarted();

    if (req.method === 'PUT') {
        // Get the Access Token from the request headers
        // const token = cookie.parse(req.headers.cookie).token;
        // const authStatus = await data.auth.checkAnyAdminUser(token, res);


        //if (authStatus) {
        if (true) {
            res.setHeader('Content-Type', 'application/json');

            if (!req.query.name) {
                res.statusCode = 400;
                res.end(
                    JSON.stringify(
                        await data.util.resWrapper(async () => {
                            throw Error('name URL param must be specified.');
                        })
                    )
                );
                return;
            }
            
            //HOMEWORK: upsert
            const forms = await data.forms.getAllForms();
            res.statusCode = 200;

            if (!forms.find(f => f.name === req.query.name)) {
                const createBody = {
                    name: req.query.name,
                    ...req.body
                }
                res.end(
                    JSON.stringify(
                        await data.util.resWrapper(async () => {
                            return await data.forms.createForm(
                                createBody,
                                res
                            );
                        })
                    )
                );
            }

            res.end(
                JSON.stringify(
                    await data.util.resWrapper(async () => {
                        return await data.forms.updateFormMetadata(
                            req.query.name,
                            req.body,
                            res
                        );
                    })
                )
            );
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};
