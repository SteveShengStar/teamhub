const data = require('../../../backend/data/index');
import {union, intersection} from 'lodash';

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'POST') {
        res.setHeader('Content-Type', 'application/json');

        if (await data.util.checkIsEmptyBody(req.body)) {
            res.statusCode = 400;
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                throw Error('body must be present in request.');
            })));
            return;
        }

        // TODO: change to status code to 5xx for undetermined failures, for tasks.add
        // TODO: distinguish better between 5xx and 4xx (use Validation error as a hint)
        res.statusCode = 200;
        res.end(JSON.stringify(await data.util.resWrapper(async () => {
            let payload = req.body.data;
            if (!payload.subteams) {
                payload.subteams = [];
            }
            // Get tasks that are relevant to the new member based on subteam(s) they are part of
            let relevantTaskIDs;
            if (payload.subteams.length === 0) {
                // If the user selected no subteams, then they will only be assigned tasks that are considered mandatory of all subteams
                relevantTaskIDs =   intersection(...( (await data.subteams.search({}, {tasks: 1}))
                                                    .map(st => st.tasks.map(taskID => taskID.toString())) )
                                                );
            } else {
                // If subteam(s) are specified, then choose only the tasks that are relevant to the chosen subteams
                relevantTaskIDs =   union(...( (await data.subteams.search({ name: {$in: payload.subteams }}, {tasks: 1}))
                                            .map(st => st.tasks.map(taskID => taskID.toString())) )
                                        );
            }

            console.log("relevantTaskIDs");
            console.log(relevantTaskIDs);
            console.log(relevantTaskIDs.length);
            const pendingTasks = relevantTaskIDs.map(taskId => { return {taskId: taskId, status: "pending"} });

            // Assign "irrelevant" status to the remaining tasks
            const allTaskIDs = (await data.task.getAll()).map(task => task.id);
            const irrelevantTaskIDs = allTaskIDs.filter( taskID => !(relevantTaskIDs.includes(taskID)) );
            console.log("irrelevantTaskIDs");
            console.log(irrelevantTaskIDs);
            console.log(irrelevantTaskIDs.length);
            const irrelevantTasks = irrelevantTaskIDs.map(taskId => { return {taskId: taskId, status: "irrelevant"} });

            payload.tasks = pendingTasks.concat(irrelevantTasks);
            return await data.members.add(payload);
        })));
    } else {
        res.statusCode = 404;
        res.end();
    }
};