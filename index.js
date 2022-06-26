'use strict';

const webServer = require("./services/web-server");
const schedule = require('node-schedule');
const db = require("./config/db");
const { updateMemberFeeStatus } = require("./app/memberTransaction/memberTransaction.utils");

const memberTrackCronJob = async () => {
    try {
        const data = await db.members.findAll({ where: { isAvailable: 1} });
        const feeData = await db.members.findAll();
        feeData.map(async (member) => {
            await updateMemberFeeStatus(member.id);
        })
        data.map(async (member) => {
            await db.member_tracks.create({ memberId: member.id, isAvailable: 0, setCurrentDateTime: new Date() });
            await db.members.update({ isAvailable: 0 }, { where: { id: member.id } });
        })
    } catch (err) {
        throw err;
    }
}

async function startup() {
    console.log('Starting application.');

    try {
        console.log('Initializing web server.');
        schedule.scheduleJob('* * 2 * * *', function(){
            memberTrackCronJob()
        });
        await webServer.initialize();
        await webServer.startKeepAlive();
    } catch (err) {
        // handle specific listen errors with friendly messages
        switch (err.code) {
            case 'EACCES':
                console.error('Requires elevated privileges');
                process.exit(1);
            case 'EADDRINUSE':
                console.error('Address is already in use');
                process.exit(1);
            default:
                throw err;
        }
    }
}

async function shutdown(e) {
    let err = e;

    console.log('Shutting down.');

    try {
        console.log('Closing web server.');
        await webServer.close();
    } catch (e) {
        console.log('Encountered Error ', e);
        err = err | e;
    }

    console.log('Web Server is closed.');

    if (err) process.exit(1);
    else process.exit(0);
}

process.on('SIGTERM', () => {
    console.log('SIGINT: Received Signal to terminate the web server.');

    shutdown();
});

process.on('SIGINT', () => {

    console.log('SIGINT: Received Signal to stop the web server.');

    shutdown();
});

process.on('uncaughtException', err => {

    console.log('Uncaught exception');
    console.error(err);

    shutdown(err);
});

startup();