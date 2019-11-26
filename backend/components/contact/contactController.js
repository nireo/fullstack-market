const contactModel = require('./contactModel');

exports.createContactMessage = async (req, res, next) => {
  const { name, content } = req.body;
  try {
    const newContact = new contactModel({
      name,
      content
    });
    await newContact.save();
    return res.json({
      success: 'sent message'
    });
  } catch (e) {
    next(e);
  }
};
