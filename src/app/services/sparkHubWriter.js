const { getSparkHubResource } = require('../config/constants');
const { executeNativeQuery } = require('../config/db');
const logger = require('../lib/logger');
const { postToUrl } = require('../services/httpClient');

module.exports = {

    sendPostDataToSparkHub: async (resourceName, isMultiData, dataId, resData) => {
        var OpexSparkhubResource = await executeNativeQuery(getSparkHubResource, { resourceName });
        var response = '';
        if (OpexSparkhubResource) {
            var list = {
                "resKey": OpexSparkhubResource[0].resourceKey,
                "srcAppKey": OpexSparkhubResource[0].appKey,
                "destAppKey": OpexSparkhubResource[0].destAppKey,
            }
            if (isMultiData) {
                list["multi"] = resData;
            } else {
                list["dataId"] = dataId;
                list["resData"] = resData;
            }
            logger.info(" invoking spark server with url " + OpexSparkhubResource[0].sparkApiUrl + " for resource " + resourceName);
            response = await postToUrl("http://localhost:9090/createHeanthSection", list);
        } else {
            logger.error("there are no resource with resourceName:", resourceName);
        }
    },
}