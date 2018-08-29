const schedule = require('node-schedule');
const logger = require('../lib/logger');
const hireCeraftSchedulerService = require('../services/hireCraftShedulerService');
const { every5Sec } = require('../config/cronProperties');

/**
 * @author Ajay Kumar MP
 * @description Desc-sheduled job to run at every 5 minuts interval
 */
async function sendHiringDataToHireCraft() {
    try {
        logger.info("------sendHiringDataToHireCraft STARTED-------");
        logger.info("Inside the sendHiringDataToHireCraft job to send data for SparkHub");
        await hireCeraftSchedulerService.sendHiringDataToHireCraft();
        logger.info("------sendHiringDataToHireCraft END-------");
    } catch (error) {
        logger.info("Error in sending data to SparkHub, Reason:", error.message);
    }
}

module.exports.sendHiringDataToHireCraft = schedule.scheduleJob(every5Sec, sendHiringDataToHireCraft);