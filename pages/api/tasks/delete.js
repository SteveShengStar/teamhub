const data = require('../../../backend/data/index');
const cookie = require('cookie');

module.exports = async (req, res) => {
    await data.initIfNotStarted();

    if (req.method === 'DELETE') {
        // Get the Access Token from the request headers
        const token = cookie.parse(req.headers.cookie).token;
        const authStatus = await data.auth.checkAnyUser(`Bearer ${token}`, res);
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');
            
            // Check that the request payload is valid
            let payload = req.body;
            if (await data.util.checkIsEmptyBody(payload)) {
                res.statusCode = 400;
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('body must be present in request.');
                })));
                return;
            }

            const { taskId } = payload;
            if (!taskId) {
                res.statusCode = 400;
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('taskId field must be specified in body.');
                })));
                return;
            }

            res.statusCode = 200;
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                await data.task.delete(taskId);
                await data.members.updateAllMembers({$pull: {tasks: {taskId: taskId}} });
                return await data.subteams.deleteTaskReference(undefined, [taskId]);
            })));
        } else {
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Bearer');
            res.end('Unauthorized user.');
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
}