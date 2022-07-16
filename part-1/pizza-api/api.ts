import Api from 'claudia-api-builder';
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  ScanCommand
} from '@aws-sdk/client-dynamodb';
import slugify from 'slugify';

const client = new DynamoDBClient({region: 'us-east-1'});
const api = new Api();

api.get('/', () => ['Welcome to AWS']);

api.post('/pizzas', async (request: any) => {
  const {body} = request;

  if (!body
    || !body.name
    || !body.ingredients
    || !Array.isArray(body.ingredients)
    || body.ingredients.length === 0) {
    throw new Error('To make a pizza include name and ingredients');
  }

  const pizzaItem = {
    url: {S: slugify(body.name)},
    name: {S: body.name},
    ingredients: {SS: body.ingredients}
  };

  await client.send(new PutItemCommand({
    TableName: 'pizzas',
    Item: pizzaItem
  }));

  console.log('Pizza is saved!', pizzaItem);
  return pizzaItem;
}, {
  success: 201,
  error: 400
});

api.get('/pizzas/{url}', async (request: any) => {
  const url = request.pathParams.url;

  const res = await client.send(new GetItemCommand({
    TableName: 'pizzas',
    Key: {url: {S: url}}
  }));
  const pizzaItem = res.Item;

  if (pizzaItem === undefined) throw new Error('Pizza not found!');

  return pizzaItem;
}, {
  success: 200,
  error: 404
});

api.get('/pizzas', async () => {
  const res = await client.send(new ScanCommand({
    TableName: 'pizzas'
  }));

  return res.Items;
}, {
  success: 200
});

export = api;
