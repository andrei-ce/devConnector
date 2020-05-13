const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//connect Database
connectDB();

//init Middlewares
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

//define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

//[need to be below app.use routes] Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder created in 'run build'
  app.use(express.static('client/build'));
  //for any path (that not the above), send the index.html file from directory name client to directory name build
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

//heroku looks for process.env.PORT, 5000 is if it doesnt exist (local env)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
