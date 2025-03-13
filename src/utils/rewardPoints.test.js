import { calculateRewardPoints } from './rewardPoints';

describe('calculateRewardPoints', () => {
  // Positive test cases
  test('should return 0 points for amount less than or equal to $50', () => {
    expect(calculateRewardPoints(50)).toBe(0);
    expect(calculateRewardPoints(30)).toBe(0);
  });

  test('should return correct points for amount between $50 and $100', () => {
    expect(calculateRewardPoints(75)).toBe(25);
    expect(calculateRewardPoints(100)).toBe(50);
  });

  test('should return correct points for amount greater than $100', () => {
    expect(calculateRewardPoints(120)).toBe(90);
    expect(calculateRewardPoints(150)).toBe(150);
  });

  // Negative test cases
  test('should return 0 points for negative amount', () => {
    expect(calculateRewardPoints(-50)).toBe(0);
  });

  test('should return correct points for fractional amount', () => {
    expect(calculateRewardPoints(120.5)).toBe(91);
  });

  test('should return 0 points for amount equal to 0', () => {
    expect(calculateRewardPoints(0)).toBe(0);
  });
});