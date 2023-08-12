const checkRequiredFields = require('../../utils/checkRequiredFields');

const validateDriverFields = (req, res, next) => {
    const { body } = req;
    const requiredTravelFields = ['name'];
  
    const driverError = checkRequiredFields(body, requiredTravelFields);
    if (driverError) return res.status(400).json({ message: driverError });

    next();
  };

  module.exports = validateDriverFields;