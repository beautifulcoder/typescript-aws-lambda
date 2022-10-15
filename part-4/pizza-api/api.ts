import Api from 'claudia-api-builder';
import {
  allPizzas,
  makePizza,
  tastePizza
} from './repositories/PizzaDb';

const api = new Api();

api.registerAuthorizer('pizza-api-cognito', {
  providerARNs: ['USER_POOL_ARN']
});

api.get('/', () => ['Welcome to AWS'], {
  cognitoAuthorizer: 'pizza-api-cognito'
});

api.post('/pizzas', async (request: any) =>
    await makePizza(request.body), {
  success: 201,
  error: 400,
  cognitoAuthorizer: 'pizza-api-cognito'
});

api.get('/pizzas/{url}', async (request: any) =>
    await tastePizza(request.pathParams.url), {
  success: 200,
  error: 404,
  cognitoAuthorizer: 'pizza-api-cognito'
});

api.get('/pizzas', async () =>
    await allPizzas(), {
  success: 200,
  cognitoAuthorizer: 'pizza-api-cognito'
});

export = api;
