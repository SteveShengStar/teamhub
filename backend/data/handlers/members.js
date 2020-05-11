const util = require('./util');
const db = require('../db');

const members = {};

const createMemberBody = async (memberBody, createMemberTypeIfNotExists) => {
    const memberSqlData = {};
    if (memberBody.name) {
        if (memberBody.name.first) {
            memberSqlData.first_name = memberBody.name.first;
        }
        if (memberBody.name.last) {
            memberSqlData.last_name = memberBody.name.last;
        }
        if (memberBody.name.display) {
            memberSqlData.display_name = memberBody.name.display;
        }
    }
    if (memberBody.program) {
        memberSqlData.program = memberBody.program;
    }
    if (memberBody.bio) {
        memberSqlData.bio = memberBody.bio;
    }
    if (memberBody.joined) {
        if (memberBody.joined.year) {
            memberSqlData.joined_year = memberBody.joined.year;
        }
        if (memberBody.joined.season) {
            memberSqlData.joined_season = memberBody.joined.season;
        }
    }
    if (memberBody.email) {
        memberSqlData.email = memberBody.email;
    }
    if (memberBody.stream) {
        if (memberBody.stream.onStream) {
            memberSqlData.on_stream = memberBody.stream.onStream;
        }
        if (memberBody.stream.coopStream) {
            memberSqlData.coop_stream = JSON.stringify(memberBody.stream.coopStream);
        }
    }
    if (memberBody.imageUrl) {
        memberSqlData.image_url = memberBody.imageUrl;
    }
    if (memberBody.birthday) {
        let birthYear = memberBody.birthday.year ? memberBody.birthday.year : 1900;
        let birthMonth = memberBody.birthday.month ? memberBody.birthday.month : 1;
        let birthDay = memberBody.birthday.day ? memberBody.birthday.day : 1;
        memberSqlData.birthday = birthYear + '-' + birthMonth + '-' + birthDay;
    }
    if (memberBody.memberType) {
        memberSqlData.member_type_id = -1;
        if (createMemberTypeIfNotExists) {
            memberSqlData.member_type_id = await util.selectOrInsertIfNotExists('member_type', 'name', memberBody.memberType);
        } else {
            const res = await db.query('SELECT * FROM member_types WHERE name=?', [memberBody.memberType]);
            if (res.length > 0) {
                memberSqlData.member_type_id = res[0].id;
            }
        }
    }
    return memberSqlData;
};

const updateMemberRelationTables = async (memberId, memberBody) => {
    if (memberBody.skills && memberBody.skills.length > 0) {
        await db.query('DELETE FROM member_skill WHERE member_id=?', [memberId]);
        const skillSqlData = [];
        for (const skill of memberBody.skills) {
            const skillId = await util.selectOrInsertIfNotExists('skill', 'name', skill);
            skillSqlData.push([memberId, skillId]);
        }
        await db.query('INSERT INTO member_skill (member_id, skill_id) VALUES ?', [skillSqlData]);
    }

    if (memberBody.interests && memberBody.interests.length > 0) {
        await db.query('DELETE FROM member_interest WHERE member_id=?', [memberId]);
        const interestSqlData = [];
        for (const interest of memberBody.interests) {
            const interestId = await util.selectOrInsertIfNotExists('interest', 'name', interest);
            interestSqlData.push([memberId, interestId]);
        }
        await db.query('INSERT INTO member_interest (member_id, interest_id) VALUES ?', [interestSqlData]);
    }

    if (memberBody.subteams && memberBody.subteams.length > 0) {
        await db.query('DELETE FROM member_subteam WHERE member_id=?', [memberId]);
        const subteamSqlData = [];
        for (const subteam of memberBody.subteams) {
            const subteamId = await util.selectOrInsertIfNotExists('subteam', 'name', subteam);
            subteamSqlData.push([memberId, subteamId]);
        }
        await db.query('INSERT INTO member_subteam (member_id, subteam_id) VALUES ?', [subteamSqlData]);
    }

    if (memberBody.projects && memberBody.projects.length > 0) {
        await db.query('DELETE FROM member_project WHERE member_id=?', [memberId]);
        const projectSqlData = [];
        for (const project of memberBody.projects) {
            const projectId = await util.selectOrInsertIfNotExists('project', 'name', project);
            projectSqlData.push([memberId, projectId]);
        }
        await db.query('INSERT INTO member_project (member_id, project_id) VALUES ?', [projectSqlData]);
    }

    if (memberBody.links && memberBody.links.length > 0) {
        await db.query('DELETE FROM link WHERE member_id=?', [memberId]);
        const linkSqlData = [];
        for (const link of memberBody.links) {
            const linkTypeId = await util.selectOrInsertIfNotExists('link_type', 'name', link.type);
            linkSqlData.push([memberId, link.link, linkTypeId]);
        }
        await db.query('INSERT INTO link (member_id, link, link_type_id) VALUES ?', [linkSqlData]);
    }
};


members.search = async (body, fields) => {
    return util.handleWrapper(async () => {
        const selectAll = fields == null;

        let searchMemberRes;
        if (!body || Object.keys(body).length === 0) {
            const searchMemberSql = 'SELECT * FROM member';
            searchMemberRes = await db.query(searchMemberSql);
        } else {
            const searchMemberSql = 'SELECT * FROM member WHERE ?';
            const searchMemberSqlData = await createMemberBody(body, false);
            if (body.id) {
                searchMemberSqlData.id = body.id;
            }
            searchMemberRes = await db.query(searchMemberSql, searchMemberSqlData);
        }

        let returnData = Promise.all(searchMemberRes.map(async (dbMember) => {
            const returnMember = {};

            returnMember.id = dbMember.id;

            if (selectAll || fields['name']) {
                returnMember.name = {
                    first: dbMember.first_name,
                    last: dbMember.last_name,
                    display: dbMember.display_name
                };
            }
            if (selectAll || fields['program']) {
                returnMember.program = dbMember.program;
            }
            if (selectAll || fields['bio']) {
                returnMember.bio = dbMember.bio;
            }
            if (selectAll || fields['skills']) {
                const skillsSql = 'SELECT skill.name from member_skill INNER JOIN skill ON skill.id=member_skill.skill_id WHERE member_skill.member_id=?';
                returnMember.skills = await db.query(skillsSql, [dbMember.id]);
            }
            if (selectAll || fields['interests']) {
                const interestsSql = 'SELECT interest.name from member_interest INNER JOIN interest ON interest.id=member_interest.interest_id WHERE member_interest.member_id=?';
                returnMember.interests = await db.query(interestsSql, [dbMember.id]);
            }
            if (selectAll || fields['joined']) {
                returnMember.joined = {
                    year: dbMember.joined_year,
                    season: dbMember.joined_season
                };
            }
            if (selectAll || fields['memberType']) {
                if (dbMember.member_type_id) {
                    const memberTypeSql = 'SELECT name from member_type WHERE id=?';
                    const memberTypeRes = await db.query(memberTypeSql, [dbMember.member_type_id]);
                    if (memberTypeRes.length > 0) {
                        returnMember.memberType = memberTypeRes[0].name;
                    } else {
                        returnMember.memberType = null;
                    }
                } else {
                    returnMember.memberType = null;
                }
            }
            if (selectAll || fields['subteams']) {
                const subteamsSql = 'SELECT subteam.name from member_subteam INNER JOIN subteam ON subteam.id=member_subteam.subteam_id WHERE member_subteam.member_id=?';
                returnMember.subteams = await db.query(subteamsSql, [dbMember.id]);
            }
            if (selectAll || fields['projects']) {
                const projectsSql = 'SELECT project.name from member_project INNER JOIN project ON project.id=member_project.project_id WHERE member_project.member_id=?';
                returnMember.subteams = await db.query(projectsSql, [dbMember.id]);
            }
            if (selectAll || fields['email']) {
                returnMember.email = dbMember.email;
            }
            if (selectAll || fields['stream'] || selectAll) {
                returnMember.stream = {
                    onStream: dbMember.on_stream,
                    coopStream: dbMember.coop_stream
                };
            }
            if (selectAll || fields['imageUrl']) {
                returnMember.imageUrl = dbMember.image_url;
            }
            if (selectAll || fields['birthday']) {
                const birthdayDate = new Date(dbMember.birthday);
                returnMember.birthday = {
                    year: birthdayDate.getFullYear(),
                    month: birthdayDate.getMonth(),
                    day: birthdayDate.getDay()
                };
            }
            if (selectAll || fields['links']) {
                const linksSql = 'SELECT link.link AS link,link_type.name AS type FROM link INNER JOIN link_type ON link.link_type_id=link_type.id WHERE link.member_id=?';
                returnMember.links = await db.query(linksSql, [dbMember.id]);
            }
            return returnMember;
        }));
        return returnData;
    });
};

members.add = async (memberBody) => {
    return util.handleWrapper(async () => {
        const memberSql = 'INSERT INTO member SET ?';
        const memberSqlData = await createMemberBody(memberBody, true);

        const res = await db.query(memberSql, memberSqlData);
        const memberId = res.insertId;
        await updateMemberRelationTables(memberId, memberBody);
        return {
            id: memberId
        };
    });
};

members.updateMember = async (memberId, memberBody) => {
    return util.handleWrapper(async () => {
        const memberSql = 'UPDATE member SET ? WHERE id=?';
        const memberSqlData = await createMemberBody(memberBody, true);

        await db.query(memberSql, [memberSqlData, memberId]);
        await updateMemberRelationTables(memberId, memberBody);
    });
};

module.exports = members;