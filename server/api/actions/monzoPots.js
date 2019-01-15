import fetch from 'node-fetch';
import moment from 'moment';

const POTS_REVEAL = [
  'Gifts',
  'Software + Subscriptions',
  'Travel',
  'Emergencies',
  'Extras (monthly)',
  'Exercise extras (monthly)',
  'Season ticket',
];

function getMonthsElapsedPercentage() {
  const result = moment().diff(`${moment().format('YYYY')}-01-01`, 'months');
  return Math.max(100, ((result + 1) * 100) / 12);
}

function monzoPots(req) {
  return new Promise((resolve, reject) => {
    const accessPassword = process.env.MONZO_ACCESS_PASSWORD;
    const accessToken = process.env.MONZO_ACCESS_TOKEN;

    if (!accessToken) {
      reject('No access token configured');
      return;
    }

    if (
      !req.body.accessPassword ||
      req.body.accessPassword !== accessPassword
    ) {
      reject('Access password incorrect');
      return;
    }

    fetch('https://api.monzo.com/pots', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (!data || !data.pots) {
          reject('Error retrieving data');
          return;
        }

        let reducedData = data.pots.filter(
          pot => !pot.deleted && POTS_REVEAL.includes(pot.name),
        );
        reducedData = reducedData.map(pot => {
          const goalAmount = parseFloat(pot.goal_amount) / 100;
          const balance = parseFloat(pot.balance) / 100;
          const monthsElapsedPercentage = getMonthsElapsedPercentage();
          const expectedSavingsSoFar =
            (goalAmount * monthsElapsedPercentage) / 100;
          const shortfall = expectedSavingsSoFar - balance;
          return {
            name: pot.name,
            balance: balance,
            goalAmount: parseFloat(pot.goal_amount) / 100,
            percentageTimeElapsed: monthsElapsedPercentage,
            shortfall: shortfall < 5 ? null : shortfall,
            percentageComplete: pot.goal_amount
              ? (100 * pot.balance) / pot.goal_amount
              : 100,
          };
        });
        //        reducedData.push({
        //          name: 'Test',
        //          balance: 30,
        //          goalAmount: 90,
        //          percentageTimeElapsed: 33.333,
        //          percentageComplete: 33.333,
        //        });
        resolve(reducedData);
      });
  });
}

export default monzoPots;
