const logger = require('../lib/logger');
const { executeNativeQuery } = require('../config/db');
const { getHiringDataForSparkHub } = require('../config/constants');
const { sendPostDataToSparkHub } = require('./sparkHubWriter');

module.exports = {
    /**
     * @author AjayKumar MP
     * @description Method which will fetch all the sid with aproved and extrernalthe data from the db
     * @returns void
     */
    sendHiringDataToHireCraft: async () => {
        logger.info("Inside the hireCraftShedulerService: sendHiringDataToHireCraft");
        var hirirngPositionListDTO = await executeNativeQuery(getHiringDataForSparkHub);
        var resData = JSON.stringify(hirirngPositionListDTO.map((res, index, hirirngPositionListDTO) => {
            // sending all sid with status IDENTIFIED & RINGFENCED as OPEN for the HireCraft 
            if (res.status === 'IDENTIFIED' || res.status === 'RINGFENCED') {
                res.status = 'OPEN';
            }
            let id = res.id;
            delete res.id;
            return {
                dataId: id,
                resData: res
            };
        }));

        // console.log(hirirngPositionListDTO, "\nstring Data", resData);
        var response = await sendPostDataToSparkHub("HiringPositions", true, null, resData);
        logger.info("hireCraftShedulerService: sendHiringDataToHireCraft, Got the response from sparkHub", response);
    },
    /**
     * @author AjayKumar MP
     * @description method which will post the individual sid data for HireCraft
     *  if any record got updated or insrted
     * @param  hirirngPositionListDTO- data which is to be sent to the Hirecraft
     * @returns void 
     */
    sendHiringDataToHireCraftOnFly: async (hirirngPositionListDTO) => {
        logger.info("Inside the hireCraftShedulerService: sendHiringDataToHireCraftOnFly");
        let id = hirirngPositionListDTO.id;
        delete hirirngPositionListDTO.id;
        // sending the sid with status IDENTIFIED & RINGFENCED as OPEN for the HireCraft 
        if (hirirngPositionListDTO.status === 'IDENTIFIED' || hirirngPositionListDTO.status === 'RINGFENCED') {
            hirirngPositionListDTO.status = 'OPEN';
        }
        var resData = JSON.stringify(hirirngPositionListDTO);
        var response = await sendPostDataToSparkHub("HiringPositions", false, id, resData);
        logger.info("hireCraftShedulerService: sendHiringDataToHireCraftOnFly, Got the response from sparkHub", response);
    }
}