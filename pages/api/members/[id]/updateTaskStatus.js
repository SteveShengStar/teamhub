const data = require('../../../../backend/data/index');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'PUT') {
        const authStatus = await data.auth.checkSpecificUser(req.headers['authorization'], req.query.id, res);
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');

            if (!req.query.id) {
                res.statusCode = 400;
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('id URL param must be specified.');
                })));
                return;
            }
            if (await data.util.checkIsEmptyBody(req.body)) {
                res.statusCode = 400;
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('body must be present in request.');
                })));
                return;
            }
            if (!req.body.taskId) {
                res.statusCode = 400;
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('taskId field must be specified in body.');
                })));
                return;
            }
            if (!req.body.status) {
                res.statusCode = 400;
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('status field must be specified in body.');
                })));
                return;
            }

            res.statusCode = 200;
            // Update the completion status of the task: {'pending', 'complete', or 'irrelevant'}
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                return await data.members.updateTaskStatus({ _id: req.query.id,
                                                            "tasks": {
                                                                "$elemMatch": {
                                                                    "_id": req.body.taskId
                                                                }
                                                            }}, 
                                                            {"tasks.$.status": req.body.status});
            })));
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};