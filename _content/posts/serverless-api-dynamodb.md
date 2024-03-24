---
title: Making a Serverless REST API with DynamoDB, API Gateway & Lambdas
datePublished: 2021-12-16
image: posts/43.jpeg
metaDescription: Let's make a REST API for prod using DynamoDB, Lambdas, and APIGateway and deploy it to our AWS VPC using the Serverless infrastructure as code (IaC) framework.
---

Back in the early 2000's I used to make dozens of Flash games for a website called Ridiculopathy.com. Some of them weren't even terrible. (How's that for a weird brag?) In those days, I stored scores and leader boards with a simple PHP script running on a VPS. A decade or two later, those Flash games are gone, but I have some React games. I need a scores API and a PHP script isn't going to cut it anymore. I don't want to have to pay for an always-on mySQL or Postgres instance to store these things. A simple Serverless API using DynamoDB might just do the trick.

So, that's what I did. I built a simple REST API using AWS cloud services and deployed it all using the Serverless Framework. This is going to involve some core AWS technologies such as DynamoDB, API Gateway, and Lambda functions, so let's walk through the project.

First off, you'll need to install the serverless framework globally.

```
npm i -g serverless
```

Next we'll create a project directory, navigate into it and run "sls create." Note that "sls" is an alias for serverless so you don't have to type it over and over. That's very handy.

```
sls create --template aws-nodejs --name mms-scores
```

This command will create a boilerplate serverless.yml along with a default "hello world" style handler for your Lambda. Most of this is example code or commented out, but it's good for you to see if you're new to infrastructure as code (IaC).

While we're at it, let's run "npm init" to create our package.json and install some dev dependencies.

```
npm i -D aws-sdk serverless-offline
```

Naturally, these are both libraries you won't need in production. Serverless offline is what we'll use when developing locally.

## Configuring Your YML

The brains of the project is in the serverless.yml file. You can find it, along with all of the source code in the Git repo [HERE](https://github.com/markarenz/mms-scores). Let's walk through the components.

```
service: mms-scores-22-api
frameworkVersion: '2'
```

The first two lines are the header. Specify the service name here.

```
provider:
  name: aws
  runtime: nodejs14.x
  lambdaHashingVersion: 20201221
  stage: ${opt:stage, 'dev'}
  region: us-east-1
  httpApi:
    cors: true
```

In the provider section, set the service as AWS, we specify the node version (14.x), set the region, and enable CORS as the default.

```
functions:
  mmsScoresApi:
    name: ${sls:stage}-mmsScoresLambda
    handler: functions/apiScores.handler
    role: mmsScoresApiLambdaIam
    events:
      - http:
          path: api
          method: any
          cors:
            origin: '*'
            headers:
              - Content-Type
              - X-Api-Key
              - X-Last-Fetch-Key
            allowCredentials: false
```

In our functions section, we define one Lambda we're calling mmsScoresApi. We also give it an AWS name of dev-mmsScoresLambda or prod-mmsScoresLambda depending on the stage name. Note the stage option in the provider section. When we deploy, if we don't specify a stage, it defaults to dev.

Handler tells AWS where to find your code. Create a "functions" directory and move your handler.js in there. Rename it to "apiScores.js."

The role is defined later on, and this will give the Lambda the permissions it needs to do its job.

The events section defines how API Gateway will handle requests. The path is "api," so we'll accept requests at the "/api" endpoint. In our case, we are looking for requests from the outside world, and as a consequence we need to use the wildcard under allow-origin. At the bottom of that section we tell serverless that we're disallowing credentials. This is because it looks like we're not allowed to use wildcard origins in CORS along with credentials and authorization. That makes sense. If we're accepting those tokens, we need to confirm that we know the server from which the requests are coming. Otherwise, it sounds like a security nightmare. Also in this section, we're allowing the headers we will need such as x-api-key and x-last-fetch-key.

```
resources:
  Resources:
```

We need to define two DynamoDB tables: one for scores, and one for games. These will all live under the umbrella of resources. Note that we have both lower and uppercase "resources" here. Keep the columns aligned properly or serverless will not be able to deploy the service properly.

```
    mmsScoresApiDDBScores:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: ${sls:stage}-MMS_SCORES
        AttributeDefinitions:
          - AttributeName: scoreId
            AttributeType: S
          - AttributeName: gameId
            AttributeType: S
          - AttributeName: score
            AttributeType: N
        KeySchema:
          - AttributeName: scoreId
            KeyType: HASH
          - AttributeName: score
            KeyType: RANGE
        GlobalSecondaryIndexes:
          - IndexName: gameIdIndex
            KeySchema:
              - AttributeName: gameId
                KeyType: HASH
              - AttributeName: score
                KeyType: RANGE
            Projection:
              ProjectionType: 'ALL'
            ProvisionedThroughput:
              ReadCapacityUnits: 5
              WriteCapacityUnits: 5
        ProvisionedThroughput:
          ReadCapacityUnits: 5
          WriteCapacityUnits: 5
```

We'll start by looking at the scores table. We give the service a logical name and specify the type as DynamoDB Table. Under properties, we give the table an AWS display name. This display name includes a reference to the stage so we can have both dev and prod versions of the database, for example. Note that when we refer to items in the serverless.yml we use the logical name and not the AWS display name.

We set up some attributes next. There are more fields in the table than just these three, but these fields are needed to define keys and indexes. By now may have guessed that an AttributeType of "S" refers to a string and "N" refers to a number, and you would be right.

The Key Schema defines the scoreId as the main partition key. A partition key is like a primary key, but they're not exactly the same. Since DynamoDB is so massively horizontally scalable, the table uses a partition key to determine where to find a record. In our case, we have a compound partition key, both the scoreId but also the score itself since that's being used as a RANGE key. The RANGE key is used for sorting.

Fun fact, if we wanted to delete a score in code, we would need to provide not only the scoreID but also the score itself since that field is part of the partition key. Unlike mySQL or Postgres, you can't just say "delete from TABLE where id = 1" you have to provide the sorting key as well in this case or the operation will fail.

After the schema definition we have our Global Secondary Index section. In DynamoDB, we use Global Secondary Indexes to allow us to very quickly query data on a specific field. Obviously, it would do us no good at all to query all the scores for all the games. We just want scores for our game. As a result, we need a new index that focuses on the gameID field in the scores table. The projectionType property tells DynamoDB how much of the original table to copy into this index. In our case, we want everything so we say "ALL."

You'll notice that the index is defined much like the main table. We provision throughput units to define the scale of resources we want to allocate for this table, granulated by read and write. We further granulate into the index itself. In fact, the main table may not be used all that much. The gameIdIndex will get used quite a bit more often, so we may decide to give that 7 read units and the original table gets 1, for example.

```
    mmsScoresApiDDBGames:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: ${sls:stage}-MMS_GAMES
        AttributeDefinitions:
          - AttributeName: gameId
            AttributeType: S
          - AttributeName: apiKey
            AttributeType: S
        KeySchema:
          - AttributeName: gameId
            KeyType: HASH
        GlobalSecondaryIndexes:
          - IndexName: apiKeyIndex
            KeySchema:
              - AttributeName: apiKey
                KeyType: HASH
            Projection:
              ProjectionType: 'ALL'
            ProvisionedThroughput:
              ReadCapacityUnits: 5
              WriteCapacityUnits: 5
        ProvisionedThroughput:
          ReadCapacityUnits: 5
          WriteCapacityUnits: 5
```

Next verse, same as the first. You'll notice that our games table is much the same as the original. In this case, we don't need sorting, so we removed the RANGE key. Also, the index here is based around the apiKey field. The game will send in an x-api-key header when requesting scores or posting scores. We'll look up the game by the API key in the Lambda, so we need an apiKeyindex GSI.

Much like the scores table, we set up projection type and provisioned throughput.

```
    mmsScoresApiLambdaIam:
      Type: AWS::IAM::Role
      Properties:
        RoleName: mmsScoresApiLambdaIamRole
        AssumeRolePolicyDocument:
          Version: '2012-10-17'
          Statement:
            - Effect: Allow
              Principal:
                Service:
                  - lambda.amazonaws.com
              Action: sts:AssumeRole
        Policies:
          - PolicyName: DynamoDBWriteAccess
            PolicyDocument:
              Version: '2012-10-17'
              Statement:
                - Effect: Allow
                  Action:
                    - logs:CreateLogGroup
                    - logs:CreateLogStream
                    - logs:PutLogEvents
                  Resource:
                    - 'Fn::Join':
                        - ':'
                        - - 'arn:aws:logs'
                          - Ref: 'AWS::Region'
                          - Ref: 'AWS::AccountId'
                          - 'log-group:/aws/lambda/*:*:*'
                - Effect: Allow
                  Action:
                    - dynamodb:PutItem
                    - dynamodb:Query
                  Resource:
                    - !Sub '${mmsScoresApiDDBScores.Arn}'
                    - !Sub '${mmsScoresApiDDBScores.Arn}/index/*'
                    - !Sub '${mmsScoresApiDDBGames.Arn}'
                    - !Sub '${mmsScoresApiDDBGames.Arn}/index/*'
```

The IAM role for the Lambdas is probably the most boilerplate of all the elements, but the basic purpose is twofold: give the Lambda write access to Cloud Watch logs and specified tables and indexes in DynamoDB. Note that we're using Put and Query operations on the tables and that we include the indexes in the resource list.

Note: AWS now supports PartiQL, an SQL-like syntax for DynamoDB. Be careful with it, though. It's easy to make some false assumptions about PartiQL based on appearances. Although it looks like SQL, the strictures of DynamoDB are still in place. Querying on non-indexed fields is still going to be an issue. PartiQL is not something we used in this project. In an earlier version I made extensive use of it, and it's pretty great.

```
  Outputs:
    mmsScoresDynamoDbScoresARN:
      Description: 'MMS Scores DynamoDB Scores Table ARN'
      Value:
        'Fn::GetAtt': [mmsScoresApiDDBScores, Arn]
    mmsScoresDynamoDbGamesARN:
      Description: 'MMS Scores DynamoDB Scores Table ARN'
      Value:
        'Fn::GetAtt': [mmsScoresApiDDBGames, Arn]
```

The outputs section here gives us information that comes from the deployment process. Most of this is just informational, not strictly necessary. After you deploy, run "sls info --verbose" to see the full redout of your output section.

```
plugins:
  - serverless-offline
```

This last bit registers the serverless-offline library as a plugin for serverless and allows you to run the "sls offline" command to simulate your cloud app locally. It's fantastic.

That's it. In less than 150 lines you have defined the components for a simple REST API in AWS. Pretty cool, huh? The next thing you'll want to do is to run "serverless deploy" to get Cloud Formation to deploy your items in the cloud and to troubleshoot any bugs in your serverless.yml.

Once it's live, you can run "sls offline" to begin local development. You don't have to quit & restart that process unless you change your serverless.yml file. Due to the nature of Lambdas as triggered functions, changes will be reflected every time you run them.

Let's create a helpers.js file in our project. We'll use it for database operations we may end up reusing later.

In our apiScores.js file, let's create our handler function, making sure to reference the event and callback since we will be using them later.

```
exports.handler = async (event, _context, callback) => {
  const sourceIp = event?.requestContext?.identity?.sourceIp;
  const { httpMethod: method, stage } = event?.requestContext;
  const { 'x-api-key': apiKey } = event.headers;
  const gameId = await getGameIdFromApiKey(apiKey, sourceIp, stage, ddb);
  if (!gameId || !['POST', 'GET'].includes(method)) {
    return callback(null, {
      statusCode: 400,
      headers: defaultResponseHeaders,
      body: JSON.stringify({
        success: false,
        error: 'API key is faulty or game is inactive.',
      }),
    });
  }
  ...
```

We grab the source IP from the event. We'll use this to make sure the source IP is allowed for this game. When setting up a game, we add the IP of the request issuer (where the game is hosted). For now we'll just use our local machine: 127.0.0.1. We also get the method and the headers such as x-api-key.

We use a helper function to get the game ID from the API key provided in the headers.

```
const getGameIdFromApiKey = async (apiKey, sourceIp, stage, ddb) => {
  const TableName = `${stage}-MMS_GAMES`;
  return await ddb
    .query({
      TableName,
      IndexName: 'apiKeyIndex',
      ScanIndexForward: false,
      KeyConditionExpression: 'apiKey = :apiKey',
      ExpressionAttributeValues: {
        ':apiKey': apiKey,
      },
    })
    .promise()
    .then((data) => {
      const game = data.Items[0];
      const { gameId, active, allowedIps } = game;
      const allowedIpsArr = allowedIps.replace(' ', '').split(',');
      const ipAllowed = allowedIpsArr.includes(sourceIp);
      const hasPermission = active && ipAllowed;
      return hasPermission ? gameId : null;
    });
};
```

This function will return null if the source IP is now in the allowed list or if the API key does not point to an active game. Note that we're using the stage name in the table name. We query the API key index of the games table and check for the apiKey, parameterizing the values with the ExpressionAttributeValues property much like we would with an ORM. Once the promise is returned, we check the source IP against the allowed list and if everything is OK, we return the game ID.

```
switch (method) {
    case 'GET':
      // Get scores
      const { 'x-last-fetch-key': lastFetchKey } = event.headers;
      const limit = 25;
      const TableName = `${stage}-MMS_SCORES`;
      let scores = [];
      const params = {
        TableName,
        IndexName: 'gameIdIndex',
        ScanIndexForward: false, // DESC
        KeyConditionExpression: 'gameId = :gameId',
        ExpressionAttributeValues: {
          ':gameId': gameId,
        },
        Limit: limit,
        QueryPageSize: limit,
      };
      if (!!lastFetchKey && lastFetchKey !== 'null') {
        params.ExclusiveStartKey = JSON.parse(lastFetchKey);
      }
      await ddb
        .query(params)
        .promise()
        .then((data) => {
          scores = data.Items;
          nextFetchKey = data.LastEvaluatedKey;
        })
        .catch((err) => {
          console.error('Scores API Error: ', err);
        });
      return callback(null, {
        statusCode: 200,
        headers: defaultResponseHeaders,
        body: JSON.stringify({
          scores,
          nextFetchKey,
        }),
      });
```

In the apiScores.js handler, we add a switch on the method. Under 'GET' we add code to get the scores for a specific game. At this point in the function, we've made sure the IP and API Key are valid. We query the gameID index of the scores table using the gameID we just retrieved. Note that we use a Limit property to only show 25 results. We use the x-last-fetch-key header to perform load-more pagination. When the first query is run, we get the scores back along with a nextFetchKey value. Fun fact: this is not an ID value like a hash or integer. It's an object. This is returned to the app so it can send it back on the next request. This is used to return values past the last fetched key plus 25 more rows and so on until no more results remain. For this project, load-more pagination is ideal, but for projects where more traditional pagination is preferred, this may not work well. What do you think? Have you found a better method for pagination with DynamoDB?

```
    case 'POST':
      // post a score
      const requestBody = JSON.parse(event.body);
      const { name, score } = requestBody;
      const scoreId = toUrlString(randomBytes(32));
      const validBody = name && score && !isNaN(score) && name.length > 0;
      if (!validBody) {
        return callback(null, {
          statusCode: 400,
          headers: defaultResponseHeaders,
          body: JSON.stringify({
            success: false,
            error: 'Required field missing or misconfigured',
          }),
        });
      }
      const scoreNum = parseInt(score);
      await scoreCreate(scoreId, gameId, name, scoreNum, stage, ddb);
      return callback(null, {
        statusCode: 201,
        headers: defaultResponseHeaders,
        body: JSON.stringify({
          scoreId,
          gameId,
          name,
          score: scoreNum,
        }),
      });
```

For the POST method, we have our score create code. Much like the GET section of the function, we confirm that the values are correct. Here, if we do not see name and score fields in the body, we return the callback with a generic 400 error. We parse the score to make sure it's a number. In future, perhaps we should use parseFloat instead for timed games. We reference a scoreCreate helper function here.

```
const scoreCreate = (scoreId, gameId, name, score, stage, ddb) => {
  const TableName = `${stage}-MMS_SCORES`;
  createdAt = getCurrentDateTime();
  return ddb
    .put({
      TableName,
      Item: { scoreId, gameId, name, score, createdAt },
    })
    .promise();
};
```

The function is remarkably simple. We accept scoreId, gameId, name, and score as arguments along with stage and the DynamoDB client. Then we simply use the put method on the ddb object to create the score in DynamoDB. It's that easy.

Once all of that is done and running well in dev, you can push it to prod.

```
sls deploy --stage prod
```

Note that some changes may need to be made to get it to work in prod. Sometimes, serverless-offline can lull you into a false sense of security about your configuration since some CORS errors won't appear until you go to prod.

Once you confirm that GET and POST methods are working in the prod endpoint using a tool like Postman, you can update the game to integrate with your new API.

```
  const [fetchKey, setFetchKey] = useState(null);
  const [scores, setScores] = useState([]);
```

## Integrating Your API Into the Game

In the ScoresScreen component of my game, I set up two useState instances, one for the scores array and one to keep the fetchKey for pagination.

```
  const getScores = (mode) => {
    console.log('getScores');
    let thisFetchKey = fetchKey;
    if (mode === 'refresh') {
      setFetchKey(null);
      thisFetchKey = null;
      setReachedReasultsEnd(false);
    }
    setScoresLoading(true);
    const url = process.env.REACT_APP__MMS_SCORES_URL;
    const apiKey = process.env.REACT_APP__MMS_SCORES_API_KEY;
    fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'x-last-fetch-key': thisFetchKey ? JSON.stringify(thisFetchKey) : null,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setScoresLoading(false);
        if (mode === 'append') {
          setScores([...scores, ...data.scores]);
        } else {
          setScores(data.scores);
        }
        if (data.nextFetchKey) {
          setFetchKey(data.nextFetchKey);
        } else {
          setReachedReasultsEnd(true);
        }
      });
  };
```

My getScores function can be called in two ways. We have "append" mode where we use the last fetch key to bring in the next 25 or fewer results and adds them to the existing scores array with concatenate and spread operations and "refresh" mode where we clear out the fetch key and start from the top.

```
 const submitScore = () => {
   setHighscoreEligible(false);
   setScoresLoading(true);
   localStorage.setItem('hsname', hsName);
   if ((hsName !== '') & (score > 0)) {
     const url = process.env.REACT_APP__MMS_SCORES_URL;
     fetch(url, {
       method: 'POST',
       mode: 'cors',
       headers: {
         'content-type': 'application/json',
         'x-api-key': process.env.REACT_APP__MMS_SCORES_API_KEY,
       },
       body: JSON.stringify({
         name: hsName,
         score: score,
       }),
     })
       .then((res) => res.json())
       .then((data) => {
         // data saved
         navigate('/');
       });
   }
 };
```

Saving a score in the game over dialog is fairly easy. As before, we send the api key in the headers and name and score in the request body. We also store the name in local storage so the next time you play the app remembers your initials.

## Conclusions

Summing up, I had enormous fun putting this together, and I really like Serverless for deploying to the cloud and especially serverless-offline for local development.

I must admit that DynamoDB was frustrating for me at times, but that was almost always when I was thinking of it like a drop-in replacement for mySQL or a no-SQL database like Mongo. It is, of course, none of those things. It's amazing, actually, and I look forward to using it again. Naturally, using something like AWS Amplify would probably have made working with DynamoDB easier, but we'll explore that at a later time. All in all, though, the ease of deploying and rolling back configurations using Serverless and CloudFormation was the bee's knees, as the kids like to say. I loved it, and I look forward to my next excuse to use it.

If you're interested in watching a code-along of this project, check out this [YouTube video](https://www.youtube.com/watch?v=M-7L6zTiphs).

Also, if you want to play the game used in this example, check out [https://figurefive.ridiculopathy.com](https://figurefive.ridiculopathy.com).

Source Code: [https://github.com/markarenz/mms-scores](https://github.com/markarenz/mms-scores)

Portfolio site for some of my weirder projects: [https://www.ridiculopathy.com](https://www.ridiculopathy.com)
