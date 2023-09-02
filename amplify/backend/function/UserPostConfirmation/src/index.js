// /**
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */
// exports.handler = event => {
//   console.log(`EVENT: ${JSON.stringify(event)}`);
//   for (const record of event.Records) {
//     console.log(record.eventID);
//     console.log(record.eventName);
//     console.log('DynamoDB Record: %j', record.dynamodb);
//   }
//   return Promise.resolve('Successfully processed DynamoDB record');
// };
var aws = require('aws-sdk');
var ddb = new aws.DynamoDB();

exports.handler = async (event, context) => {
  let date = new Date();

  if (event.request.userAttributes.sub) {
    const postTable = `User-${process.env.API_NEXTJSBLOG_GRAPHQLAPIIDOUTPUT}-${process.env.ENV}`;

    let params = {
      Item: {
        id: { S: event.request.userAttributes.sub },
        __typename: { S: 'User' },
        fullName: { S: event.request.userAttributes.name },
        owner: {
          S: `${event.request.userAttributes.sub}::${event.request.userAttributes.sub}`,
        },
        email: { S: event.request.userAttributes.email },
        username: { S: event.request.userAttributes.preferred_username },
        createdAt: { S: date.toISOString() },
        updatedAt: { S: date.toISOString() },
      },
      TableName: postTable,
    };

    // Call DynamoDB
    try {
      await ddb.putItem(params).promise();
      console.log('Success');
    } catch (err) {
      console.log('Error', err);
    }

    console.log('Success: Everything executed correctly');
    context.done(null, event);
  } else {
    // Nothing to do, the user's email ID is unknown
    console.log('Error: Nothing was written to DynamoDB');
    context.done(null, event);
  }
};
