const awsmobile = {
  aws_project_region: "mock-region",
  aws_cognito_identity_pool_id: "mock-cognito-identity-pool-id",
  aws_cognito_region: "mock-cognito-region",
  aws_user_pools_id: "mock-user-pools-id",
  aws_user_pools_web_client_id: "mock-user-pools-web-client-id",
  aws_appsync_graphqlEndpoint: "mock-appsync-endpoint",
  aws_appsync_region: "mock-appsync-region",
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: "mock-appsync-api-key",
  aws_s3_bucket: "mock-s3-bucket",
  aws_s3_region: "mock-s3-region",
  aws_dynamodb_region: "mock-dynamodb-region",
  aws_dynamodb_table_name: "mock-dynamodb-table-name",
  aws_cloud_logic_custom: [
    {
      name: "mock-function",
      endpoint: "mock-function-endpoint",
      region: "mock-function-region",
    },
  ],
};

export default awsmobile;
