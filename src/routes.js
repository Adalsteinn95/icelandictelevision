const express = require('express');

const router = new express.Router();
const schedule = require('./schedule');

router.get('/', (req, res) => {
  schedule.channels()
  .then((result) => {
    res.render('index', { title: 'Sjónvarpstöðvar á Íslandi',
      channels: result.data.results[0].endpoints.name,
      endpoints: result.data.results[0].endpoints });
  })
  .catch((error) => {
    res.render('error', { title: 'Ups eitthvad er að!', error });
  });
});
router.get('/tv/:channel', (req, res) => {
  schedule.channel(req.params.channel)
  .then((result) => {
    res.render('index', { title: req.params.channel, channels: result.data.results });
  })
  .catch((error) => {
    res.render('error', { title: 'Ups eitthvad er að!', error });
  });
});

module.exports = router;
