import createGraphPoint from '../logic/createGraphPoint';

describe('createGraphPoint', () => {
  test('should return null without input given', () => {
    expect(createGraphPoint()).toBe(null);
  });

  test('should return null on invalid input given', () => {
    expect(createGraphPoint('asdad12')).toBe(null);
  });

  test('should return point on valid input given', () => {
    expect(createGraphPoint('AB1')).toEqual({
      name: 'A',
      path: {
        dest: 'B',
        distance: 1
      }
    });
  });
});
