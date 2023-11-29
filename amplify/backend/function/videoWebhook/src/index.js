/* Amplify Params - DO NOT EDIT
	API_NEXTJSBLOG_GRAPHQLAPIENDPOINTOUTPUT
	API_NEXTJSBLOG_GRAPHQLAPIIDOUTPUT
	API_NEXTJSBLOG_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require("aws-sdk");

const iotdata = new AWS.IotData({
  endpoint: "a29ieb9zd32ips-ats.iot.us-east-1.amazonaws.com",
});

const message = ({ payload, topic }) => {
  return {
    topic,
    payload: JSON.stringify(payload),
    qos: 0,
  };
};

const publishMessage = async ({ payload, topic }) => {
  const response = await iotdata.publish(message({ payload, topic })).promise();
  console.log(response, JSON.stringify(payload));
};

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  console.log("body", JSON.parse(event.body));
  const body = JSON.parse(event.body);

  if (body.type === "video.asset.ready") {
    const publishTopic = `post-${body.data.passthrough}`;
    await publishMessage({
      payload: body,
      topic: publishTopic,
    });
  }

  // 'video.upload.asset_created',
  // event.body.data.new_asset_settings.passthrough;

  // 'video.upload.asset_created',
  // event.body.data.new_asset_settings.passthrough;

  //   await publishMessage({
  //     payload: event.body,
  //     topic: publishTopic,
  //   });
  // 2023-11-29T18:42:12.059Z	0ad24579-a0d6-4d3b-a972-d7d8a1fd791f	INFO	body {
  //   type: 'video.asset.ready',
  //   request_id: null,
  //   object: {
  //     type: 'asset',
  //     id: 'zpQyn00D5SU8yXNtLUdTATkyT4vxaTn7cor02iDF6kgLk'
  //   },
  //   id: 'efe4a135-9cd7-5d80-bc04-e7b7795213e2',
  //   environment: { name: 'Development', id: 'i0phmt' },
  //   data: {
  //     upload_id: '00KKL5ARMWHKAt5SGPZlacXoDHubiPocmY1u83wPYAcM',
  //     tracks: [ [Object], [Object] ],
  //     test: true,
  //     status: 'ready',
  //     resolution_tier: '720p',
  //     playback_ids: [ [Object], [Object] ],
  //     passthrough: '93029b06-ac20-40d3-8407-fe74fa8c0a4f',
  //     non_standard_input_reasons: { video_codec: 'hevc', unsupported_pixel_format: 'yuv420p10le' },
  //     mp4_support: 'none',
  //     max_stored_resolution: 'HD',
  //     max_stored_frame_rate: 30,
  //     max_resolution_tier: '1080p',
  //     master_access: 'none',
  //     id: 'zpQyn00D5SU8yXNtLUdTATkyT4vxaTn7cor02iDF6kgLk',
  //     encoding_tier: 'smart',
  //     duration: 10.047889,
  //     created_at: 1701283324,
  //     aspect_ratio: '9:16'
  //   },
  //   created_at: '2023-11-29T18:42:11.268000Z',
  //   attempts: [],
  //   accessor_source: null,
  //   accessor: null
  // }
  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify("Hello from Lambda!"),
  };
};
