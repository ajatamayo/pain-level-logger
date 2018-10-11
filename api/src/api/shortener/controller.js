const validUrl = require('valid-url');
const { InternalServerError } = require('../../errors/systemErrors');
const config = require('../../config');
const Counter = require('./counterModel');
const Url = require('./urlModel');
const base58 = require('./base58');

const shortener = async (req, res, next) => {
  try {
    const longUrl = req.body.url;
    if (!longUrl) {
      return res.status(400).json({ success: false, message: 'The url parameter is required.' });
    }
    if (!validUrl.isUri(longUrl)) {
      return res.status(400).json({ success: false, message: 'This is not a url. Try appending http:// or https:// to your url. :)' });
    }

    let shortUrl = '';
    let pk;

    const existingUrl = await Url.findOne({ longUrl });
    if (existingUrl) {
      shortUrl = `${config.urls.client}/${base58.encode(existingUrl.pk)}`;
      ({ pk } = existingUrl);
    } else {
      let counter = await Counter.findOne({ key: 'urlCount' });
      if (!counter) {
        counter = await Counter.create({ key: 'urlCount' });
      }
      const newUrl = await Url.create({ longUrl, pk: counter.seq });
      shortUrl = `${config.urls.client}/${base58.encode(newUrl.pk)}`;
      counter.seq += 1;
      counter.save();
      ({ pk } = newUrl);
    }

    return res.status(200).json({
      success: true, shortUrl, longUrl, pk,
    });
  } catch (error) {
    return next(new InternalServerError(error));
  }
};

const decoder = async (req, res, next) => {
  try {
    const { encodedPk } = req.params;
    const pk = base58.decode(encodedPk);
    const urlDoc = await Url.findOne({ pk });
    if (urlDoc) {
      return res.status(200).json({ url: urlDoc.longUrl });
    }
    return res.status(200).json({ url: config.defaultRedirectUrl });
  } catch (error) {
    return next(new InternalServerError(error));
  }
};

module.exports = {
  shortener,
  decoder,
};
