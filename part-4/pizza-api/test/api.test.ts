import { expect } from 'chai';
import api from '../api';

describe('API', () => {
  [
    {
      path: '',
      requestTypes: ['GET']
    }, {
    path: 'pizzas',
    requestTypes: ['POST', 'GET']
  }, {
    path: 'pizzas/{url}',
    requestTypes: ['GET']
  }].forEach(route => {
    it(`/${route.path}#${route.requestTypes.join(',')}`, () => {
      expect(Object.keys(api.apiConfig().routes[route.path]))
        .to.deep.equal(route.requestTypes);
    })
  })
})
