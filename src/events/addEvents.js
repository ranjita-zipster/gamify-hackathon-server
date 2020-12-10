const  Router = require('express');
var firebase = require('../firebase');
const router = Router();

const ADD_FAMILY_DRIVER = 'ADD_FAMILY_DRIVER';
const BOOK_TRIP = '100TH_TRIP';

const addEvent = async (account, event, notificationText) => {
  const accountData = await firebase.collection('users').doc(account);
  const data  = (await accountData.get()).data();
  await accountData.set({
     ...data,
     badges: [...data.badges, { name: event, viewed: false }],
     notifications: [...data.notifications, notificationText]
    }, { merge: true });
}
router.post('/', (req, res) => {
  switch(req.body.event) {
    case  'ADD_FAMILY_DRIVER':
      console.info('ADD_FAMILY_DRIVER event triggered');
      addEvent(req.body.account, 'ADD_FAMILY_DRIVER', {
        title: 'You recieved a badge',
        body: 'You\'ve been awarded the family driver badge',
        read: false,
        type: 'achievement'
      });
      break;
    case  'BOOK_TRIP':
      console.info('100TH_TRIP event triggered');
      addEvent(req.body.account, '100TH_TRIP', {
        title: 'You recieved a badge',
        body: 'You\'ve been awarded the 100th zip badge',
        read: false,
        type: 'achievement'
      });
      break;
    default:
      console.error('no matching event');
  }
  return res.status(201).send(`${req.body.event} posted`);
});

module.exports = router;