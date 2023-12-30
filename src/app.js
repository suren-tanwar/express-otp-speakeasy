// app.js
const express = require('express');
const otpRoutes = require('./routes/otpRoutes');
const authRoutes = require('./routes/authRoutes');
const secureRoutes = require('./routes/secureRoutes');
const { handleErrors } = require('./middleware/errorMiddleware');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// ... (other middleware and routes)

app.use('/otp', otpRoutes);
app.use('/auth', authRoutes);
app.use('/secure', secureRoutes);

handleErrors(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
