const data = require('../../../../backend/data/index');
const ObjectID = require('mongodb').ObjectID;
import {difference, intersection, union} from 'lodash';

module.exports = async (req, res) => {
    await data.initIfNotStarted();
    if (req.method === 'PUT') {
        const authStatus = true;//await data.auth.checkSpecificUser(req.headers['authorization'], req.query.id, res);
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
                /*if (payload.subteams) { 
                    const currentSubteamIDs = (await data.members.search({ _id: req.query.id }, {subteams: 1}))[0].subteams.map(st => st._id.toString());
                    // Translate the subteam names into subteam IDs
                    const newSubteamIDs = (await data.subteams.search( {name: payload.subteams }, {_id: 1})).map(st => st._id.toString());

                    
                    const subteamsToLeave = difference(currentSubteamIDs, newSubteamIDs); 
                    const subteamsNewlyJoined = difference(newSubteamIDs, currentSubteamIDs);
                    const subteamsStayingIn = intersection(newSubteamIDs, currentSubteamIDs);
                    
                    // console.log(subteamsToLeave);
                    // console.log(subteamsNewlyJoined);
                    // console.log(subteamsStayingIn);
                    
                    // For subteams that user is leaving, set the "pending" tasks to "irrelevant" status
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

                    // console.log(tasksForStayingSubteams);
                    // console.log(tasksForLeavingSubteams);

                    const taskIDsToExclude = difference(tasksForLeavingSubteams, tasksForStayingSubteams);
                    console.log("Tasks to Exclude");
                    console.log(taskIDsToExclude);
                    await data.members.updateMember({ _id: req.query.id, "tasks._id": {$in: taskIDsToExclude} }, 
                                                    { $set: {"tasks.$.status" : "irrelevant"}} );

                    // For subteams that user is entering into, set the previously "irrelevant" tasks to "pending" status
                    const tasksForJoiningSubteams = union(
                                                    ...((await data.subteams.search({_id: subteamsNewlyJoined}, {tasks: 1}))
                                                                            .map(st => st.tasks.map(task => task.toString())
                                                        )) 
                                                    );
                    console.log("Teams newly joined");
                    console.log(tasksForJoiningSubteams);
                    const taskIDsToActivate = difference(tasksForJoiningSubteams, tasksForStayingSubteams);

                    console.log("Tasks to Activate");
                    console.log(taskIDsToActivate);
                    //await data.members.updateMember({ _id: req.query.id, tasks: {$all: [ {$elemMatch: {"taskId": new ObjectID("5fb73d030e6264002db1073c"), "status": "irrelevant"}} ] }}, { $set: {"tasks.$.status" : "pending"}} );
                    await data.members.updateMember({ _id: req.query.id, $or: taskIDsToActivate.map(t => {return {"tasks._id": taskIDsToActivate}}) }, 
                                                    { $set: {"tasks.$.status" : "pending"}} );
                }*/

                return await data.members.updateMember({ _id: req.query.id }, payload);
            })));
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};