const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 5000;
const sequelize = require('./dbConfig');
const userRoutes = require('./Routes/userRoute');
const taskRoutes = require('./Routes/taskRoute');
const cors = require('cors');

app.use(cors());

app.use(express.json());

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use('/api/users', userRoutes);

app.use('/api/tasks', taskRoutes);
