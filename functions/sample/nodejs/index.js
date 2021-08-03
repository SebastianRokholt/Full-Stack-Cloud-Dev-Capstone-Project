/**
 * Get all dealerships
 */

const Cloudant = require('@cloudant/cloudant');

function main(params) {

    const cloudant = Cloudant({
        url: params.COUCH_URL,
        plugins: { iamauth: { iamApiKey: params.IAM_API_KEY } }
    });

    let dbList = getDbs(cloudant);
    return { dbs: dbList };
}

function getDbs(cloudant) {
    cloudant.db.list().then((body) => {
        body.forEach((db) => {
            dbList.push(db);
        });
    }).catch((err) => { console.log(err); });
}
