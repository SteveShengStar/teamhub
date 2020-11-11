const data = require('../../../backend/data/index');

module.exports = async (req, res) => {
    await data.initIfNotStarted();

    if (req.method === 'POST') {
        const authStatus = await data.auth.checkAnyUser(req.headers['authorization'], res);
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');

            let payload = req.body;
            if (await data.util.checkIsEmptyBody(payload)) {
                res.statusCode = 400;
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('body must be present in request.');
                })));
                return;
            }

            if (!payload.title) {
                res.statusCode = 400;
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('title field must be specified in body.');
                })));
                return;
            }

            if (!payload.subteams) {
                // If no subteams field is provided, then associate the task with every subteam
                let teams = await data.subteams.getAll();
                payload.subteams = teams.map(st => st.id);
            } else {
                payload.subteams = await data.util.replaceNamesWithIdsArray(payload.subteams, data.subteams, false);
            }


            res.statusCode = 200;
            // Add the New Task to the tasks collection (tasks table)
            let taskData = await data.util.resWrapper(async () => {
                return await data.task.add(payload);
            });
            if (taskData.success === false) {
                res.end(JSON.stringify(taskData));
                return;
            }
            
            // Assign this new task to everybody, with a "pending" status
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                return await data.members.assignTaskToAllMembers({ taskId: taskData.id, status: "pending" });
            })));
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};