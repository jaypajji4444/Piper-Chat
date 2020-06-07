
const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');

// @desc      Register User
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  //Create user
  const user = await User.create({
    name: name,
    email: email,
    password: password
  });

  sendTokenResponse(user, 200, res);
};

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate emil & password
  if (!email || !password) {
    return next(
      res.status(400).json({
        success: false,
        error: 'Please provide email and password',
      })
    );
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(
      res.status(401).json({
        success: false,
        error: 'Invalid Credentials',
      })
    );
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(
      res.status(401).json({
        success: false,
        error: 'Invalid Credentials',
      })
    );
  }

  sendTokenResponse(user, 200, res)
};

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Public
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});


// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  // const resetUrl = `${req.protocol}://${req.get(
  //   'host'
  // )}/api/v1/auth/resetpassword/${resetToken}`;

  const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token

  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
};

// @desc      Send Invite
// @route     POST /api/v1/auth/sendInvite
// @access    Public
exports.sendInvite = asyncHandler(async (req, res, next) =>{

  // Create reset url
  const resetUrl = 'http://localhost:3000/register'

  const message = `Hey, your invite has been accepted! \n\nJoin the Piper Chat now and start enjoy secure and reliable messaging. You can sign up using the url below: \n\n${resetUrl}`

  try {
    await sendEmail({
      email: req.body.email,
      subject: 'Invite for Piper Chat',
      message
    });
    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
   console.log(err)
    return next(new ErrorResponse('Email could not be sent', 500));
  }
});


// @desc      Get all users
// @route     GET /api/v1/auth/users
// @access    Public
exports.getUser = asyncHandler(async(req,res,next)=>{
  const users =await User.find({})
  if(!users)return res.status(404).json({success:false,data:"No User found"})
  return res.status(200).json({success:true,data:users})
})