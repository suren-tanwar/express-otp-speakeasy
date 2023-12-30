// utils/errorUtils.js
const handle404Error = (req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
  };
  
  const handle500Error = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  };
  
  module.exports = {
    handle404Error,
    handle500Error,
  };
  