const members = require('./members');
const db = require('../db');
const config = require('../config.json');

(async function () {
    // await db.init(config.db);
    // await members.add({
    //     name: {
    //         first: 'Michael',
    //         last: 'Pu',
    //         display: 'Michael Pu'
    //     },
    //     email: 'michael.p@waterloop.ca',
    //     imageUrl: 'https://lh3.googleusercontent.com/-rg0rzyhwiFE/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nDX7tH2ElwMIDNhTJrD8n4xHMlR-Q/s96-c/photo.jpg',
    //     joined: {
    //         season: 'Fall',
    //         year: 2019
    //     },
    //     bio: 'Test bio 123',
    //     birthday: {
    //         month: 4,
    //         year: 2020,
    //         day: 10
    //     },
    //     program: 'Software Engineering',
    //     stream: {
    //         onStream: false,
    //         coopStream: {
    //             S20: true
    //         }
    //     }
    // });
    // await db.close();
    console.log(JSON.stringify({
        name: {
            first: 'Michael',
            last: 'Pu',
            display: 'Michael Pu'
        },
        email: 'michael.p@waterloop.ca',
        imageUrl: 'https://lh3.googleusercontent.com/-rg0rzyhwiFE/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nDX7tH2ElwMIDNhTJrD8n4xHMlR-Q/s96-c/photo.jpg',
        joined: {
            season: 'Fall',
            year: 2019
        },
        bio: 'Test bio 123',
        birthday: {
            month: 4,
            year: 2020,
            day: 10
        },
        program: 'Software Engineering',
        stream: {
            onStream: false,
            coopStream: {
                S20: true
            }
        }
    }, null, 2));
})();