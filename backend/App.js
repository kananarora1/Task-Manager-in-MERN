const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 5000;
const sequelize = require('./dbConfig');
const userRoutes = require('./Routes/userRoute');
const taskRoutes = require('./Routes/taskRoute');

app.use(express.json());

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.error('Error connecting to database:', err));

app.use('/api/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
