import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  ScanCommand
} from '@aws-sdk/client-dynamodb';
import slugify from 'slugify';

const client = new DynamoDBClient({region: 'us-east-1'});

export const makePizza = async (pizza: any) => {
  if (!pizza
    || !pizza.name
    || !pizza.ingredients
    || !Array.isArray(pizza.ingredients)
    || pizza.ingredients.length === 0) {
    throw new Error('To make a pizza include name and ingredients');
  }

  const {name, ingredients} = pizza;
  const pizzaItem = {
    url: {S: slugify(name)},
    name: {S: name},
    ingredients: {SS: ingredients}
  };

  await client.send(new PutItemCommand({
    TableName: 'pizzas',
    Item: pizzaItem
  }));

  console.log('Pizza is saved!', pizzaItem);
  return pizzaItem;
}

export const tastePizza = async (url: string) => {
  const res = await client.send(new GetItemCommand({
    TableName: 'pizzas',
    Key: {url: {S: url}}
  }));
  const pizzaItem = res.Item;

  if (pizzaItem === undefined) throw new Error('Pizza not found!');

  return pizzaItem;
}

export const allPizzas = async () => {
  const res = await client.send(new ScanCommand({
    TableName: 'pizzas'
  }));

  return res.Items;
}
