const logger = require('../lib/logger');
const { executeNativeQuery } = require('../config/db');
const { getHiringDataForSparkHub } = require('../config/constants');
const { sendPostDataToSparkHub } = require('./sparkHubWriter');

module.exports = {
    sendHiringDataToHireCraft: async () => {
        logger.info("Inside the hireCraftShedulerService");
        var hirirngPositionListDTO = await executeNativeQuery(getHiringDataForSparkHub);
        var resData = JSON.stringify(hirirngPositionListDTO.map((res, index, hirirngPositionListDTO) => {
            return {
                dataId: res.id,
                resData: res
            };
        }));

        // console.log(hirirngPositionListDTO, "\nstring Data", resData);
        var response = await sendPostDataToSparkHub("HiringPositions", true, null, resData);
        logger.info("hireCraftShedulerService: Got the response from sparkHub", response);
    },
}