import mongoose from 'mongoose';
import response from '../helpers/response';

const Blog = mongoose.model('Blog');

exports.list = (req, res) => {
  let query = {};
  Blog.find(query).then(blogs => {
    return res.status(200).send(blogs);
  }).catch(err => {
    return res.send(err);
  });
}

exports.getById = (req, res, next) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err) {
      return res.send(err);
    }
    if (!blog) {
      return response.sendNotFound(res);
    }
    req.blog = blog;
    next();
  });
}

exports.returnBlog = (req, res) => {
  return res.status(200).send(req.blog);
}