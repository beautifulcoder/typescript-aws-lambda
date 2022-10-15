import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon, { SinonStub } from 'sinon';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  allPizzas,
  makePizza,
  tastePizza
} from '../repositories/PizzaDb';

chai.use(chaiAsPromised);

describe('PizzaDb', () => {
  let send: SinonStub;

  let pizzaItem = {
    url: {S: 'P'},
    name: {S: 'P'},
    ingredients: {SS: ['A', 'B']}
  };

  let pizza = {
    url: 'P',
    name: 'P',
    ingredients: ['A', 'B']
  };

  beforeEach(() => {
    send = sinon.stub(DynamoDBClient.prototype, 'send');
  })

  afterEach(() => {
    send.restore();
  })

  it('makePizza#success', async () => {
    send.resolves();

    const result = await makePizza({
      name: 'P', ingredients: ['A', 'B']
    });

    expect(result).to.deep.equal(pizzaItem);
  })

  it('makePizza#fail', async () => {
    send.resolves();

    await expect(makePizza({})).to.eventually.be.rejected;
  })

  it('tastePizza#success', async () => {
    send.resolves({Item: pizzaItem});

    const result = await tastePizza('P');

    expect(result).to.deep.equal(pizza);
  })

  it('tastePizza#fail', async () => {
    send.resolves({Item: undefined});

    await expect(tastePizza('P')).to.eventually.be.rejected;
  })

  it('allPizzas', async () => {
    send.resolves({Items: [pizzaItem]});

    const result = await allPizzas();

    expect(result).to.deep.equal([pizzaItem]);
  })
})
