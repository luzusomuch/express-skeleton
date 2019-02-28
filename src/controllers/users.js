import mongoose from 'mongoose';
import response from '../helpers/response';
import request from '../helpers/request';
import pagination from '../helpers/pagination';
import mailer from '../helpers/mailer';

const User = mongoose.model('User');

exports.getUserById = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.send(err);
    }
    if (!user) {
      return response.sendNotFound(res);
    }
    req.user = user;
    next();
  });
}

exports.returnCurrentUser = (req, res) => {
  res.send(req.currentUser);
}

exports.list = function(req, res) {
  if (req.currentUser.role != 'admin') return response.sendForbidden(res);
  User.paginate(request.getFilteringOptions(req, ['email', 'role']), request.getRequestOptions(req), function(err, result) {
    if (err) return res.send(err);
    pagination.setPaginationHeaders(res, result);
    res.json(result.docs);
  });
};

exports.read = function(req, res) {
  if (req.user.deleted) {
    return res.sendNotFound(res);
  }
  return res.json(req.user);
};

exports.create = function(req, res) {
  const newUser = new User(req.body);
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return response.sendBadRequest(res, err);
    mailer.sendMail({to: newUser.email});
    response.sendCreated(res, user);
  });
};

exports.update = function(req, res) {
  const user = req.body;
  delete user.role;
  if (!req.currentUser.canEdit({ _id: req.params.id })) return response.sendForbidden(res);
  if (user.password) {
    req.user.markModified('password');
  }
  req.user.set(user).save().then(() => {
    res.json(req.user);
  }).catch(err => {
    res.send(err);
  });
};

exports.delete = function(req, res) {
  let data = {
    deleted: true,
    deletedBy: req.currentUser._id,
    deletedAt: new Date()
  };
  if (req.user.deleted) {
    data = {
      deleted: false,
      deletedBy: null,
      deletedAt: null
    };
  }
  req.user.set(data).save().then(() => {
    res.json(req.user);
  }).catch(err => {
    res.send(err);
  });
};
