const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');
const Blog = require('./models/blog');

const { checkForAuthentication } = require('./middlewares/auth');

const PORT = process.env.PORT || 8000;

const app = express();
mongoose.connect("mongodb://localhost:27017/blogs").then((e) => console.log("MongoDB Connected!"));


app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.resolve("./public")));
app.use(express.static(path.resolve("./views")));



app.set("view engine", "ejs");
app.set("views", path.resolve("./views/"))

app.use(checkForAuthentication("token"));

app.get('/', async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user : req.user,
    blogs: allBlogs,
  });
});

app.use('/user', userRoutes);
app.use('/blog', blogRoutes);


app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});