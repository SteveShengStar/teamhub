const data = require('../backend/data');
const fs = require('fs');
const Member = require('../backend/data/schema/Member');

const membersData = fs.readFileSync('./membersData.csv', 'utf-8');
const parsedMembers = membersData.split('\n').map((row) => {
    const data = row.split(',');
    const name = data[0];
    const team = data[1];
    const position = data[2];
    return { name, team, position };
});

async function main() {
    try {
        await data.initIfNotStarted();
        const memberTypes = await data.memberTypes.getAll();
        const subteams = await data.subteams.getAll();
        const members = await data.members.getAll();

        await Promise.all(
            parsedMembers.map((member) => {
                const foundMember = members.find(
                    (m) => m.name.display === member.name
                );
                const desiredSubteam = subteams.find(
                    (subteam) => subteam.name === member.team
                );
                const desiredType = memberTypes.find(
                    (memberType) => memberType.name === member.position
                );

                if (!foundMember) {
                    const nameChunks = member.name.split(' ');
                    const first = nameChunks[0].toLowerCase();
                    const last =
                        nameChunks[nameChunks.length - 1].toLowerCase();
                    return data.members.add({
                        interests: [],
                        skills: [],
                        projects: [],
                        subteams: [desiredSubteam.name],
                        memberType: desiredType.name,
                        bio: '',
                        email: `${first}.${last[0]}@waterloop.ca`,
                        name: {
                            first: nameChunks[0],
                            last: nameChunks.slice(1).join(' '),
                            display: member.name,
                        },
                    });
                }

                if (desiredSubteam && desiredType) {
                    return data.members.updateMember(
                        { _id: foundMember._id },
                        {
                            subteams: [desiredSubteam.name],
                            memberType: desiredType.name,
                        }
                    );
                }
                return Promise.resolve();
            })
        );
    } catch (err) {
        console.error(err);
    }
}

main().finally(() => process.exit(0));
