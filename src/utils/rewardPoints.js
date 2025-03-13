export const calculateRewardPoints = (amount) => {
    let points = 0;
    if (amount > 50) {
      points += Math.min(amount - 50, 50);
    }
    if (amount > 100) {
      points += (amount - 100) * 2;
    }
    return points;
  };