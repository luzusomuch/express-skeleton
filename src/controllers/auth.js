import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from 'config';
import response from '../helpers/response';

const User = mongoose.model('User');
const Token = mongoose.model('Token');

const privateKey = config.key.privateKey;
const tokenExpireInMinutes = config.key.tokenExpireInMinutes;

exports.login = function(req, res) {
  User.findOne({ email: req.body.email })
  .exec(function(err, user) {
    if (err) throw err;

    if (!user) {
      response.sendUnauthorized(res, 'Authentication failed.');
    } else if (user) {
      if (user.deleted) {
        return response.sendNotFound(res);
      }
      if (!user.verified) {
        return res.status(500).send({
          message:'Please verify your account first',
          success: false
        });
      }
      user.verifyPassword(req.body.password, function(err, isMatch) {
        if (isMatch) {
          const token = jwt.sign(user.getTokenData(), privateKey, {
            expiresIn: tokenExpireInMinutes
          });

          res.json({
            success: true,
            message: 'Token created.',
            token: token
          });
        } else {
          response.sendUnauthorized(res, 'Authentication failed.');
        }
      });
    }
  });
}

exports.verifyToken = function(req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

  if (token) {
    jwt.verify(token, privateKey, function(err, decoded) {
      if (err) {
        response.sendUnauthorized(res, 'Failed to authenticate token.');
      } else {
        User.findById(decoded.id, function(err, user) {
          if (err) res.send(err);
          req.currentUser = user;
          next();
        });
      }
    });
  } else {
    response.sendUnauthorized(res, 'No token provided.');
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.currentUser.role === 'admin') {
    next();
  } else {
    response.sendForbidden(res);
  }
};

exports.verifyAccount = (req, res) => {
  if (!req.params.token) {
    return response.sendBadRequest(res, 'Missing token');
  }
  Token.findOne({token: req.params.token}, (err, token) => {
    if (err) {
      return res.send(err);
    }
    if (!token) {
      return response.sendNotFound(res, 'Token not found');
    }
    User.findById(token.userId, (err, user) => {
      if (err) {
        return res.send(err);
      }
      if (!user) {
        return response.sendNotFound(res, 'User not found');
      }
      user.set({verified: true}).save().then(() => {
        return res.status(200).send({success: true, message: 'Verified account successfully'});
      }).catch(err => {
        return res.send(err);
      })
    });
  });
}
