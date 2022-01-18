/**
  * This is the code for the IBM Cloud Function "get_dealerships". 
  * The function is part of a cloud-hosted API, so this code is not really part of
  * the codebase for the Django website. I am mainly leaving it here for my own reference 
  * and documentation's sake, as well as for any fellow learners who are curious about the 
  * API and IBM Cloud Functions. 
  * 
  * main() will be run automatically when this action is invoked in IBM Cloud
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *        In this case, the param can be an empty JSON object, a JSON object with the key "dealerID" and the 
  *        id of a dealership as the value, or a JSON object with the key "state" and the name of a state as value. 
  *        I.e: {} or {"state": "California"} or {"dealerId": "14"}
  * @return The action returns a JSON object consisting of the HTTP response, i.e:
  *         {
  *             "body": {
  *                 "bookmark": "g1AAAABweJzLYWBgYMpgSmHgKy5JLCrJTq2MT8lPzkzJBYormCamJJuZmxkYplpampumGCWlGBoapZkkJiWmGaYkpxmD9HHA9BGlIwsAxe0fhw",
                    "docs": [
                        {
                            "_id": "5adc67601e9975d2bd112f4abaf0ba06",
                            "_rev": "1-34e7ebd07643af43db578a46ee1d6365",
                            "address": "3 Nova Court",
                            "city": "El Paso",
                            "full_name": "Holdlamis Car Dealership",
                            "id": 1,
                            "lat": 31.6948,
                            "long": -106.3,
                            "short_name": "Holdlamis",
                            "st": "TX",
                            "state": "Texas",
                            "zip": "88563"
                        },
                        ..., 
                    ],
                    ...
                }
            }
**/
  

/* Gets all dealerships in the database that match the specified state. */
function main(params) {
    secret = {
    "COUCH_URL": "https://a7637d95-13fd-4d36-bd33-c43326d44b48-bluemix.cloudantnosqldb.appdomain.cloud",
    "IAM_API_KEY": "KvcAgqnvLvK8TRAqUujdAmrtR8mVwTjK2yHxDBDU9GQ1",
    "COUCH_USERNAME": "a7637d95-13fd-4d36-bd33-c43326d44b48-bluemix"
    };

    return new Promise(function (resolve, reject) {
        const Cloudant = require('@cloudant/cloudant'); 
        const cloudant = Cloudant({
            url: secret.COUCH_URL,
            plugins: {iamauth: {iamApiKey:secret.IAM_API_KEY}} 
        });
        const dealershipDb = cloudant.use('dealerships'); 
        
        if (params.dealerId) { 
            // return dealership of specified dealership ID (if specified)
            dealershipDb.find({"selector": {"id": parseInt(params.dealerId)}}, 
                function (err, result) { 
                        if (err) { 
                            console.log(err) 
                            reject(err); 
                        } 
                        let code=200; 
                            if (result.docs.length==0) { 
                                code= 404; 
                            }
                        resolve({ 
                            statusCode: code, 
                            headers: { 'Content-Type': 'application/json' }, 
                            body: result 
                        }); 
                    }); 
        } else if (params.state) { 
            // return dealerships for the specified state (if specified)
            dealershipDb.find({"selector": {"state": {"$eq": params.state}}}, 
                function (err, result) { 
                        if (err) { 
                            console.log(err) 
                            reject(err); 
                        } 
                        let code=200; 
                            if (result.docs.length==0) { 
                                code= 404; 
                            }
                        resolve({ 
                            statusCode: code, 
                            headers: {'Content-Type': 'application/json'}, 
                            body: result 
                        }); 
                    }); 
        } else { 
            // return all documents if no parameters are specified
            dealershipDb.list(
                { include_docs: true }, 
                function (err, result) { 
                    if (err) { 
                        console.log(err) 
                        reject(err); 
                    } 
                    resolve({ 
                        statusCode: 200, 
                        headers: { 'Content-Type': 'application/json' }, 
                        body: result 
                    }); 
                }
            ); 
        } 
    });
}