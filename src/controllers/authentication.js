const User = require("../models").User;
const { passwordValidator, emailValidator} = require("../validator");
const { generateJwt } = require("../helpers/generateJwt");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

exports.registerController = async (req, res, next) => {
  try {
    const result = passwordValidator(req.body.password);

    if (!result.isValid) {
      res.status(400).json({
        error: "Passwords must have min length 8, 1 upper character, 1 number, and 1 symbol",
        status: false
      });
      return;
    }

    const trimmedEmail = req.body.email.trim().toLowerCase();
    const emailErrorMsg = emailValidator(trimmedEmail);

    if (emailErrorMsg) {
      res.status(400).json({ error: emailErrorMsg, status: false });
      return;
    }

    const userExisted = await User.findOne({
      where: {
        [Op.or]: [
          { email: req.body.email },
          { phone: req.body.phone }
        ]
      },
      raw: true
    });

    if (userExisted && userExisted.id) {
      res.status(400).json({ error: "User already exist", status: false });
      return;
    }

    const user = await User.create({
      name: req.body.name,
      username: req.body.username,
      email: trimmedEmail,
      password: req.body.password,
      phone: req.body.phone,
    });

    if (user) {
      res.status(201).json({
        message: `New user created successfully.`,
        status: true,
        token: generateJwt(user)
      });
    } else {
      next();
    }
  } catch (e) {
    res.status(400).json({ error: e.message, status: false });
  }
}

exports.loginController = async (req, res, next) => {
  try {
    const trimmedEmail = req.body.email.trim().toLowerCase();
    const emailErrorMsg = emailValidator(trimmedEmail);

    if (emailErrorMsg) {
      res.status(400).json({ error: emailErrorMsg, status: false });
      return;
    }

    const user = await User.findOne({
      where: { email: req.body.email },
      raw: true
    });

    if (!user) {
      res.status(400).json({ error: "Invalid email or password", status: false });
      return;
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passwordMatch) {
      res.status(400).json({ error: "Invalid email or password", status: false });
      return;
    }

    if (user) {
      res.status(200).json({
        message: `Login successfully.`,
        status: true,
        token: generateJwt(user)
      });
    } else {
      next();
    }
  } catch(e) {
    res.status(400).json({ error: e.message, status: false });
  }
}
