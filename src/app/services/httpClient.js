const httpClient = require('request');
var querystring = require('querystring');
httpClient.defaults({
    json: true,
})
module.exports = {
    postToUrl: async (url, params) => {
        var post_data = querystring.stringify(params);
        var options = {
            uri: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                'Content-Length': Buffer.byteLength(post_data)
            },
            body: post_data
        };
        await httpClient.post(options, (err, httpResponse, body) => {
            if (err) {
                throw Error('upload failed due to:', err.message);
            }
            console.log('Upload successful!  Server responded with:', body);
            return body;
        });
    }
}