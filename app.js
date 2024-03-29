const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


// express app
const app = express();

const dbURI = `mongodb+srv://netninja:test1234@cluster0.lgllxcm.mongodb.net/node-tuts?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Start the server after successful MongoDB connection
    app.listen(process.env.PORT || 3000, function () {
      console.log('Server is running on port ' + (process.env.PORT || 3000));
    });
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

// app.use(morgan('dev'));
// app.use((req, res, next) => {
//   res.locals.path = req.path;
//   next();
// });

app.get('/', (req, res) => {
  res.redirect('/blogs');
});


app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

//blogs
app.use('/blogs',blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});




















// app.use((req, res, next) => {
//   console.log('new request made:');
//   console.log('host: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
//   next();
// });
