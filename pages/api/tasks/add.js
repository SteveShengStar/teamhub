const data = require('../../../backend/data/index');
var ObjectID = require('mongodb').ObjectID;

module.exports = async (req, res) => {
    await data.initIfNotStarted();

    if (req.method === 'POST') {
        const authStatus = await data.auth.checkAnyUser(req.headers['authorization'], res);
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

            const {title, description, searchBarPlaceholderTexts, documentLinks, subteams} = payload;
            if (!title) {
                res.statusCode = 400;
                res.end(JSON.stringify(await data.util.resWrapper(async () => {
                    throw Error('title field must be specified in body.');
                })));
                return;
            }

            /*if (!payload.subteams) {
                // If no subteams field is provided, then associate the task with every subteam
                let teams = await data.subteams.getAll();
                payload.subteams = teams.map(st => st.id);
            } else {
                payload.subteams = await data.util.replaceNamesWithIdsArray(payload.subteams, data.subteams, false);
            }*/


            // Add the New Task to the Tasks Collection (Tasks Table)
            let queryResponse = 
                await data.task.add({
                    title: title, 
                    description: description, 
                    searchBarPlaceholderTexts: searchBarPlaceholderTexts, 
                    documentLinks: documentLinks
                });
            const taskID = new ObjectID(queryResponse._id);
            console.log(taskID);
            //console.log(queryResponse)


            // If no subteams are specified in the payload, then associate the new task with every subteam
            const subteamIDs = subteams ? subteams : (await data.subteams.getAll()).map(team => team.id);
            // Update the subteams table/collection so that relevant subteams are now referencing the new task
            queryResponse = await data.subteams.addTaskReference(subteamIDs, taskID);
            //console.log(queryResponse);

            
            res.statusCode = 200;
            // Assign this new task to everybody, with a "pending" status
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                const allMembers = await data.members.search({}, {subteams: 1});

                // Choose only members that belong to a subteam that is in the list, subteamIDs
                const relevantMemberIDs = allMembers.filter( member => {
                    const memberSubteamIDs = member.subteams.map(st => st.id);

                    /*console.log("memberSubteamIDs");
                    if (memberSubteamIDs && memberSubteamIDs.length) 
                        console.log(typeof memberSubteamIDs[0]);
                    
                    console.log("subteamIDs");
                    if (subteamIDs && subteamIDs.length)
                        console.log(typeof subteamIDs[0]);*/
                    for (let i = 0; i < memberSubteamIDs.length; i++) {
                        if ( subteamIDs.includes(memberSubteamIDs[i]) ) {
                            return true;
                        }
                    }
                    return false;
                }).map( member => member._id );
                //console.log("Relevant Members");
                //console.log(relevantMemberIDs);
                
                return await data.members.assignTaskToAllMembers( {_id: {$in: relevantMemberIDs}}, { taskId: taskID.valueOf(), status: "pending" });
            })));
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
};