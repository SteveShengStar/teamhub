const util = require('./util');
const { OAuth2Client } = require('google-auth-library');
const authConfig = require('./auth.config.json');
const {google} = require('googleapis');

const calendar = {};

const REQUIRED_PARAMS = {
    ADD_EVENT: ['startTime', 'endTime', 'title']
}
const _hasRequiredParameters = (requiredParams, paramsToCheck, res) => {
    if (!requiredParams.every(p => paramsToCheck.hasOwnProperty(p))) {
        res.statusCode = 400;
        throw Error("Missing one or more of these required fields: {" + requiredParams.join(", ") + "}");
    }
}

const _checkDate = (date, res) => {
    if (!(date instanceof Date) || isNaN(date)) {
        res.statusCode = 400;
        throw Error("Invalid Date provided");
    }
}

/**
 * Add a new Google Calendar Event
 * 
 * @param {String} token: access_token for Oauth
 * @param {Object} eventDetails: contains details about the calendar event
 * 
 * @returns Details of the Calendar Event that got added
 */
calendar.add = async (token, eventDetails, res) => {
    _hasRequiredParameters(REQUIRED_PARAMS.ADD_EVENT, eventDetails, res);
    const eventStartTime = new Date(eventDetails['startTime']);
    const eventEndTime = new Date(eventDetails['endTime']);
    _checkDate(eventStartTime, res);
    _checkDate(eventEndTime, res);

    const client = new OAuth2Client(authConfig['client_id']);
    client.setCredentials({
        access_token: token
    });
    const calendar = google.calendar({version: 'v3', auth: client});

    const attendeesInfo = [];
    if (eventDetails.hasOwnProperty('attendeeEmails')) {
        for (let i = 0; i < eventDetails['attendeeEmails'].length; i++) {
            attendeesInfo.push({ email: eventDetails['attendeeEmails'][i] })
        }
    }

    let conferenceObj = {};
    if (eventDetails['createMeetLink']) {
        conferenceObj = {
            createRequest: {
                requestId: eventDetails['title'],
                conferenceSolutionKey: {
                    type: 'hangoutsMeet'
                }
            }
        }
    }

    const event = {
        summary: eventDetails['title'],
        location: '',
        description: eventDetails['description'],
        start: {
            dateTime: eventStartTime,
            timeZone: 'America/New_York'
        },
        end: {
            dateTime: eventEndTime,
            timeZone: 'America/New_York'
        },
        conferenceData: conferenceObj,
        attendees: attendeesInfo,
    }

    try {
        return calendar.events.insert(
            {
                calendarId: 'teamwaterloop.ca_n1amot5q70vk292jdq9sh2fq0g@group.calendar.google.com',
                resource: event,
                conferenceDataVersion: 1,
            })
            .then(() => {
                console.log('Calendar Event Created.');
                return eventDetails;
            })
    } catch (e) {
        throw (e);
    }
}


/**
 * Updates an existing Google Calendar Event
 * 
 * @param {String} token: access_token for Oauth
 * @param {Object} eventDetails: object containing the new data (used to update the calendar event)
 * 
 * @returns New details of the Calendar Event that got updated
 */
calendar.update = async (token, eventDetails) => {
    const client = new OAuth2Client(authConfig['client_id']);
    client.setCredentials({
        access_token: token
    });

    const calendar = google.calendar({version: 'v3', auth: client});

    const eventStartTime = new Date(eventDetails['startTime']);
    const eventEndTime = new Date(eventDetails['endTime']);
    const attendeesInfo = [];
    for (var i = 0; i < eventDetails['attendeeEmails'].length; i++) {
        attendeesInfo.push({ email: eventDetails['attendeeEmails'][i] })
    }

    let conferenceObj = {};
    if (eventDetails['createMeetLink']) {
        conferenceObj = {
            createRequest: {
                requestId: eventDetails['title'],
                conferenceSolutionKey: {
                    type: 'hangoutsMeet'
                }
            }
        }
    }

    const event = {
        summary: eventDetails['title'],
        location: '',
        description: eventDetails['description'],
        start: {
            dateTime: eventStartTime,
            timeZone: 'America/New_York'
        },
        end: {
            dateTime: eventEndTime,
            timeZone: 'America/New_York'
        },
        conferenceData: conferenceObj,
        colorId: 1,
        attendees: attendeesInfo,
    }

    calendar.events.patch({
        calendarId: 'teamwaterloop.ca_n1amot5q70vk292jdq9sh2fq0g@group.calendar.google.com',
        eventId: eventDetails['eventId'],
        requestBody: event,
    }, (err) => {
        if (err) return console.log('Error updating event: ', err)

        return console.log('Calendar Event Updated.')
    })

    return eventDetails;
}

module.exports = calendar;