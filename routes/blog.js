const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const Blog = require("../models/blog");
const Comment = require("../models/comment");

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()} - ${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", function (req, res) {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const blog = await Blog.create({
    title: req.body.title,
    body: req.body.body,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });

  return res.redirect(`/blog/${blog._id}`);
});

router.post("/comment/:blogId",  async (req, res) => {
  const comment = await Comment.create({
    content : req.body.content,
    blogId : req.params.blogId,
    createdBy : req.user._id,
  });
  // console.log(comment);
  return res.redirect(`/blog/${req.params.blogId}`);
});

router.get("/:id", async (req, res) => {
  
  const blog = await Blog.findById(req.params.id).populate("createdBy");

  // console.log(req.user);
  const comments = await Comment.find({blogId : req.params.id}).populate("createdBy");
  // console.log("comments", comments)
  return res.render("blog", {
    blog,
    user: req.user,
    comments
  });
});



module.exports = router;
