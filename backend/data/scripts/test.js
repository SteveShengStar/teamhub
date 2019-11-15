const data = require('../index');

const testBody =
{
    name: {
        first: 'Michael',
        last: 'Pu',
        display: 'Michael Pu'
    },
    bio: 'This is my bio.',
    skills: ['MongoDB'],
    joined: {
        year: 2019,
        season: 'Fall'
    },
    coopExp: [],
    memberType: 'Newbie',
    subteam: 'Software',
    project: {
        name: 'TeamHub',
        subteams: ['Software']
    },
    email: 'michael.pu@waterloop.ca',
    stream: {
        isCoop: true,
        onStream: true,
        coopStream: 1,
        currentSchoolTerm: '1A'
    },
    age: 18,
    birthday: {
        month: 4,
        day: 10
    },
    links: [
        {
            type: 'GitHub',
            link: 'https://github.com/mchlp'
        }
    ]
};

data.init();
//data.members.add(testBody);
console.log(JSON.stringify(testBody, '', 4));