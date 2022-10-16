import { difference } from 'lodash';
const data = require('../../../backend/data/index');
const cookie = require('cookie');
const ObjectId = require('mongodb').ObjectId;

module.exports = async (req, res) => {
    await data.initIfNotStarted();

    if (req.method === 'POST') {
        // Get the Access Token from the request headers
        const token = cookie.parse(req.headers.cookie).token;
        const authStatus = await data.auth.checkAnyUser(token, res);
        if (authStatus) {
            res.setHeader('Content-Type', 'application/json');

            let payload = req.body;
            if (await data.util.checkIsEmptyBody(payload)) {
                // Check that the request payload is valid
                res.statusCode = 400;
                res.end(
                    JSON.stringify(
                        await data.util.resWrapper(async () => {
                            throw Error('body must be present in request.');
                        })
                    )
                );
                return;
            }

            const {
                title,
                description,
                searchBarPlaceholderTexts,
                documentLinks,
                subteams,
            } = payload;
            if (!title) {
                res.statusCode = 400;
                res.end(
                    JSON.stringify(
                        await data.util.resWrapper(async () => {
                            throw Error(
                                'title field must be specified in body.'
                            );
                        })
                    )
                );
                return;
            }

            let queryResponse = // Add the New Task to the Tasks Collection (Tasks Table)
                await data.task.add({
                    title: title,
                    description: description,
                    searchBarPlaceholderTexts: searchBarPlaceholderTexts,
                    documentLinks: documentLinks,
                });
            const taskID = new ObjectId(queryResponse._id);

            // If no subteams are specified in the payload, associate the new task with every subteam
            const subteamIDs = subteams
                ? subteams
                : (await data.subteams.getAll()).map((team) => team.id);
            // Update the subteams table/collection so that relevant subteams are now referencing the new task
            queryResponse = await data.subteams.addTaskReference(
                subteamIDs,
                taskID
            );

            res.statusCode = 200;
            res.end(
                JSON.stringify(
                    await data.util.resWrapper(async () => {
                        const allMembers = await data.members.search(
                            {},
                            { subteams: 1 }
                        );
                        // Choose only members that belong to a subteam in the array (subteamIDs)
                        const relevantMemberIDs = allMembers
                            .filter((member) => {
                                const memberSubteamIDs = member.subteams.map(
                                    (st) => st.id
                                );

                                for (
                                    let i = 0;
                                    i < memberSubteamIDs.length;
                                    i++
                                ) {
                                    if (
                                        subteamIDs.includes(memberSubteamIDs[i])
                                    ) {
                                        return true;
                                    }
                                }
                                return false;
                            })
                            .map((member) => member._id);

                        // Assign this new task to everybody, with a "pending" status
                        await data.members.assignTaskToAllMembers(
                            { _id: { $in: relevantMemberIDs } },
                            { taskId: taskID.toString(), status: 'pending' }
                        );

                        // For the rest of the members, assign "irrelevant" status to the new task
                        const remainingMemberIDs = difference(
                            allMembers.map((m) => m._id),
                            relevantMemberIDs
                        );
                        return await data.members.assignTaskToAllMembers(
                            { _id: { $in: remainingMemberIDs } },
                            { taskId: taskID.toString(), status: 'irrelevant' }
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
