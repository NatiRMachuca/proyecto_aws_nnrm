const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda"); // CommonJS import
const client = new LambdaClient({
  apiVersion: '2015-03-31',
  endpoint: 'http://localhost:3002'
});

const main = async () => {
  const params = {
    // FunctionName is composed of: service name - stage - function name, e.g.
    FunctionName: 'natyAwsProject-sandbox-initTable',
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify({
      "Records": [
        {
          "eventVersion": "2.1",
          "eventSource": "aws:s3",
          "awsRegion": "us-east-1",
          "eventTime": "2024-06-27T19:51:11.574Z",
          "eventName": "ObjectCreated:Put",
          "userIdentity": {
            "principalId": "AWS:AIDAJJG55KIRDNWQ6K3EQ"
          },
          "requestParameters": {
            "sourceIPAddress": "187.190.167.83"
          },
          "responseElements": {
            "x-amz-request-id": "BW9CZQFDGF2H1M8B",
            "x-amz-id-2": "3pg5kE9IZnUeGwHZeoIDpvIms45DFfzB1xW5waxcTWuFMdypXVUkculYqPrfkuDofLivZkfY8fcI20wlviqGRruzBteho6zr"
          },
          "s3": {
            "s3SchemaVersion": "1.0",
            "configurationId": "YmVjZDMwZmEtN2Q2Mi00YzEzLTgzYzQtMjJkZmM3NmU3OGE5",
            "bucket": {
              "name": "sandbox-transfers-bucket-87612837681",
              "ownerIdentity": {
                "principalId": "A6J90TZPRBXA1"
              },
              "arn": "arn:aws:s3:::sandbox-transfers-bucket-87612837681"
            },
            "object": {
              "key": "transfers_back_test.json",
              "size": 3959,
              "eTag": "754a4e5bc1a6c909ec7340557db8c99c",
              "sequencer": "00667DC2AF828A450A"
            }
          }
        }
      ]
    }),
  }
  const command = new InvokeCommand(params);
  const response = await client.send(command);
  console.log(response);
}

main()