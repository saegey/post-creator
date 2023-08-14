
const { gpx } = '@tmcw/togeojson';
const { DOMParser } = '@xmldom/xmldom';
const AWS = require('aws-sdk');
const S3 = new AWS.S3();

var ddb = new AWS.DynamoDB();
let table = 'posts;

function putImageDB(key) {
  let owner = key.split('/')[2]; // We put it here in the previous tutorial
  let name = key.split('/').pop();
  let online = 'public';
  let date = new Date().toISOString();
  var params = {
    TableName: table,
    Item: {
      key: { S: key },
      owner: { S: owner },
      name: { S: name },
      online: { S: online },
      date: { S: date },
    },
  };
  // Call DynamoDB to add the item to the table
  return ddb
    .putItem(params, function (err, data) {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data);
      }
    })
    .promise();
}


exports.handler = async function (event) {
  // console.log('Received S3 event:', JSON.stringify(event, null, 2));
  // const bucket = event.Records[0].s3.bucket.name;
  // const key = event.Records[0].s3.object.key;
  // console.log(`Bucket: ${bucket}`, `Key: ${key}`);
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  const eventName = event.Records[0].eventName;
  const bucket = event.Records[0].s3.bucket.name; //eslint-disable-line
  let key = event.Records[0].s3.object.key.replace('%3A', ':'); //eslint-disable-line
  const imgSize = event.Records[0].s3.object.size;
  const maxSize = 5000000; // More that 5Mb images would be rejected
	const filename = key.split('.').slice(0, -1).join('.');
	const data = await S3.getObject({ Bucket: bucket, Key: key });
	console.log('data', JSON.stringify(data))


  // if (eventName === 'ObjectCreated:Put') {
	// 	console.log('This is a put event');
	// 	await putImageDB(key);
  // }
};
