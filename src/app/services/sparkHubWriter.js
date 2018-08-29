const { getSparkHubResource } = require('../config/constants');
const { executeNativeQuery } = require('../config/db');
const logger = require('../lib/logger');
const { postToUrl } = require('../services/httpClient');

module.exports = {

    sendPostDataToSparkHub: async (resourceName, isMultiData, dataId, resData) => {
        var res = await executeNativeQuery(getSparkHubResource, { resourceName });
        var {resourceKey, appKey, destAppKey, sparkUrl} = res[0];
        var response = '';
        if (sparkUrl) {
            var list = {
                "resKey": resourceKey,
                "srcAppKey": appKey,
                "destAppKey": destAppKey,
            }
            if (isMultiData) {
                list["multi"] = resData;
            } else {
                list["dataId"] = dataId;
                list["resData"] = resData;
            }
            logger.info(" invoking spark server with url " + sparkUrl + " for resource " + resourceName);
            response = await postToUrl(sparkUrl, list);
            console.log(response);
            return response;
        } else {
            logger.error("there are no resource with resourceName:", resourceName);
            throw new Error("there are no resource with resourceName:", resourceName);
        }
    },
}