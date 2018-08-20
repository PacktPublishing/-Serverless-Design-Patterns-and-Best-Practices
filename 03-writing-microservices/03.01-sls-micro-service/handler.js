'use strict';

module.exports.user = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'invoked with method ' + event.httpMethod            
        })
    };

    callback(null, response);
};
