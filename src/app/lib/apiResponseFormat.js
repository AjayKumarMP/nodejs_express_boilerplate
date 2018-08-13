module.exports = {
    setResponse: (response, data)=> {
        const { body, status } = data;
        response.body = body;
        response.status = status;
    }
}


