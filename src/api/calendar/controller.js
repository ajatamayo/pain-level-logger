const { chain } = require('lodash');
const { InternalServerError } = require('../../errors/systemErrors');
const MarkedDay = require('./markedDayModel');

const toggleDay = async (req, res, next) => {
  try {
    const { yyyy, mm, dd } = req.params;
    const { value } = req.body;

    if (value === null) {
      return res.status(400).json({ message: 'Please select a value first.' });
    }

    const thisDate = `${yyyy}${mm}${dd}`;
    const conditions = { date: thisDate, user: { email: req.user.email } };

    const existing = await MarkedDay.findOne(conditions);

    if (existing) {
      existing.value = value;
      await existing.save();
      return res.status(200).json({ operation: 'updated', date: thisDate, value });
    }

    conditions.value = value;
    await MarkedDay.create(conditions);
    return res.status(200).json({ operation: 'added', date: thisDate, value });
  } catch (error) {
    return next(new InternalServerError(error));
  }
};

const getDates = async (req, res, next) => {
  try {
    const conditions = { user: { email: req.user.email } };

    const days = await MarkedDay.find(conditions);

    const dates = chain(days.map(d => ({ date: d.date, value: d.value })))
      .keyBy('date')
      .mapValues('value')
      .value();
    return res.status(200).json({ dates });
  } catch (error) {
    return next(new InternalServerError(error));
  }
};

module.exports = {
  toggleDay,
  getDates,
};
