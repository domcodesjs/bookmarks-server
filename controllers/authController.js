exports.validateAPIKey = (req, res, next) => {
  const API_KEY = req.get('x-api-key');

  if (!API_KEY) {
    return res.status(401).json({
      success: false,
      message: 'Access Denied'
    });
  }

  if (checkAPIKey(API_KEY)) {
    return next();
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid API KEY'
  });
};

function checkAPIKey(API_KEY) {
  return API_KEY === process.env.API_KEY ? true : false;
}
