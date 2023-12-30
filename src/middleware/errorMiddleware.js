// middleware/errorMiddleware.js
const { handle404Error, handle500Error } = require('../utils/errorUtils');

const handleErrors = (app) => {
  app.use(handle404Error);
  app.use(handle500Error);
};

module.exports = {
  handleErrors,
};
