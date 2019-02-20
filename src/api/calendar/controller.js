const { InternalServerError } = require('../../errors/systemErrors');
const MarkedDay = require('./markedDayModel');

const toggleDay = async (req, res, next) => {
  try {
    const { yyyy, mm, dd } = req.params;

    const thisDate = `${yyyy}${mm}${dd}`;
    const conditions = { date: thisDate, user: { email: req.user.email } };

    const existing = await MarkedDay.findOne(conditions);

    if (existing) {
      await MarkedDay.findByIdAndDelete(existing._id);
      return res.status(200).json({ operation: 'removed', date: thisDate });
    }

    await MarkedDay.create(conditions);
    return res.status(200).json({ operation: 'added', date: thisDate });
  } catch (error) {
    return next(new InternalServerError(error));
  }
};

module.exports = {
  toggleDay,
};
