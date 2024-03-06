const models = require("../models");
const { getUserData } = require("../helpers/generateJwt");

const User = models.User;

exports.getUserProfile = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'Unauthorized!', status: false });
    }

    const token = req.headers.authorization.split(' ')[1];
    const userData = await getUserData(token);

    if (!userData) {
      return res.status(401).json({ error: 'Unauthorized!', status: false });
    }

    let user = await User.findByPk(userData.id);

    if (user) {
      res.status(200).json({
        message: `Successfully.`,
        status: true,
        data: {
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
        }
      });
    } else {
      next();
    }
  } catch (e) {
    res.status(400).json({ error: e.message, status: false });
  }
}
