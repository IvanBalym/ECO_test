const createGraph = require('../src/createGraph');

test('should return empty graph from empty points list', () => {
  expect(createGraph([])).toEqual({});
});

test('should return graph with values', () => {
  const points = [{
    name: 'A',
    path: {
      dest: 'B',
      distance: 1
    }
  },{
    name: 'A',
    path: {
      dest: 'C',
      distance: 4
    }
  },{
    name: 'B',
    path: {
      dest: 'C',
      distance: 2
    }
  }]
  expect(createGraph(points)).toEqual({
    'A': {
      paths: {
        'B': 1,
        'C': 4
      }
    },
    'B': {
      paths: {
        'C': 2
      }
    }
  });
});