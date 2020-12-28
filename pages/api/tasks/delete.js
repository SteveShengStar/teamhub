const data = require('../../../backend/data/index');
var ObjectID = require('mongodb').ObjectID;

module.exports = async (req, res) => {
    await data.initIfNotStarted();

    if (req.method === 'DELETE') {
        //const authStatus = await data.auth.checkAnyUser(req.headers['authorization'], res);
        if (true) {
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
                console.log("One");
                await data.task.delete(taskId);
                console.log("Two");
                await data.members.updateAllMembers({$pull: {tasks: {taskId: taskId}} });
                console.log("Three");
                return await data.subteams.deleteTaskReference(undefined, [taskId]);
            })));
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
}