const data = require('../../../../backend/data/index');
const ObjectID = require('mongodb').ObjectID;
import {difference, intersection, union} from 'lodash';
const cookie = require('cookie');

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'PUT') {
        // Get the Access Token from the request headers
        const token = cookie.parse(req.headers.cookie).token;
        const authStatus = await data.auth.checkSpecificUser(`Bearer ${token}`, req.query.id, res);
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
            if (!req.body.data) {
                res.statusCode = 400;
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('data field must be specified in body.');
                })));
                return;
            }

            res.statusCode = 200;
            res.end(JSON.stringify(await data.util.resWrapper(async () => {

                // If the user changes their list of affiliated subteams, update their tasks accordintly
                let payload = req.body.data;
                if (payload.subteams) { 
                    const currentSubteamIDs = (await data.members.search({ _id: req.query.id }, {subteams: 1}))[0].subteams.map(st => st._id.toString());
                    const newSubteamIDs = (await data.subteams.search( {name: payload.subteams }, {_id: 1})).map(st => st._id.toString()); // Translate the subteam names into subteam IDs
                    
                    
                    const numTasks = (await data.members.search({ _id: req.query.id }))[0].tasks.length;
                    console.log(numTasks);

                    if (numTasks === 0) {
                        // Logic for brand new user
                        // Allocate tasks for the new user
                        const allTaskIDs = (await data.task.getAll()).map(t => t._id.toString());
                        const taskIDsForJoiningSubteams = union(
                            ...((await data.subteams.search({_id: newSubteamIDs}, {tasks: 1}))
                                                    .map(st => st.tasks.map(task => task.toString())
                                ))
                            );
                        console.log(taskIDsForJoiningSubteams);
                        const irrelevantTaskIDs = difference(allTaskIDs, taskIDsForJoiningSubteams);
                        console.log(irrelevantTaskIDs);
                        const tasksForJoiningSubteams = taskIDsForJoiningSubteams.map(t => { return {taskId: t, status: 'pending'}});
                        const irrelevantTasks = irrelevantTaskIDs.map(t => { return {taskId: t, status: 'irrelevant'}});

                        await data.members.updateMember({ _id: req.query.id }, {$push: {tasks: tasksForJoiningSubteams.concat(irrelevantTasks)}});
                    } else {
                        // Logic for existing users
                        const subteamsToLeave = difference(currentSubteamIDs, newSubteamIDs); 
                        const subteamsNewlyJoined = difference(newSubteamIDs, currentSubteamIDs);
                        const subteamsStayingIn = intersection(newSubteamIDs, currentSubteamIDs);
                        
                        // console.log(subteamsToLeave);
                        // console.log(subteamsNewlyJoined);
                        // console.log(subteamsStayingIn);
                        
                        // For subteams that user is leaving, set the "pending" tasks to "irrelevant" status
                        // TODO: test the 0 array scenarios (what happens if union returns nothing ??)
                        const tasksForStayingSubteams = union(
                                                        ...((await data.subteams.search({_id: subteamsStayingIn}, {tasks: 1}))
                                                                                .map(st => st.tasks.map(task => task.toString())
                                                            ))
                                                        );
                        const tasksForLeavingSubteams = union(
                                                        ...((await data.subteams.search({_id: subteamsToLeave}, {tasks: 1}))
                                                                                .map(st => st.tasks.map(task => task.toString())
                                                            )) 
                                                        );
                        const tasksForJoiningSubteams = union(
                                                        ...((await data.subteams.search({_id: subteamsNewlyJoined}, {tasks: 1}))
                                                                                .map(st => st.tasks.map(task => task.toString())
                                                            )) 
                                                        );
                        const taskIDsToActivate = difference(tasksForJoiningSubteams, tasksForStayingSubteams);
                        const taskIDsToDeactivate = difference( difference(tasksForLeavingSubteams, tasksForStayingSubteams), taskIDsToActivate );
                        

                        // console.log(tasksForStayingSubteams);
                        // console.log(tasksForLeavingSubteams);
                        // console.log("Tasks to Exclude");
                        // console.log(taskIDsToDeactivate);


                        // For subteams that user is entering into, set the previously "irrelevant" tasks to "pending" status
                        await data.members.updateMember({ _id: req.query.id, "tasks.taskId": {$in: taskIDsToDeactivate} }, 
                                                        { $set: {'tasks.$[t].status' : "irrelevant"}},
                                                        { arrayFilters: [{ "t.taskId": {  $in: taskIDsToDeactivate.map(t => new ObjectID(t)) } }] } );

                        
                        // console.log("Teams newly joined");
                        // console.log(tasksForJoiningSubteams);
                        // console.log("Tasks to Activate");
                        // console.log(taskIDsToActivate);
                        await data.members.updateMember({ _id: req.query.id, "tasks.taskId": {$in: taskIDsToActivate} }, 
                                                        { $set: {'tasks.$[t].status' : "pending"}},
                                                        { arrayFilters: [{ "t.taskId": {  $in: taskIDsToActivate.map(t => new ObjectID(t)) } }] } );
                        //console.log("Done");
                    }
                }

                return await data.members.updateMember({ _id: req.query.id }, payload);
            })));
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};