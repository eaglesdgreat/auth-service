const jwt = require("jsonwebtoken");
const config = require("../../config").$security
const dotenv = require("dotenv");

// Loading .env vars
dotenv.config();

const secretKey = process.env.SECRET_KEY;

exports.generateJwt = (user) => {
  var expiry = new Date();

  expiry.setDate(expiry.getDate() + config.expiresIn);

  return jwt.sign({
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    username: user.username,
    exp: parseInt(expiry.getTime() / 1000),
  }, secretKey);
}


const jwtVerify = (accessToken, cb) => {
  // Verifying our JWT token using the accessToken and the secretKey
  jwt.verify(
    accessToken,
    secretKey,
    (error, accessTokenData = {}) => {
      const user = accessTokenData;

      // If we get an error or the user is not found we return false
      if (error || !user) {
        return cb(false);
      }

      return cb(user);
    }
  )
}

exports.getUserData = async (accessToken) => {
  // We resolve the jwtVerify promise to get the user data
  const UserPromise = await new Promise(resolve => jwtVerify(accessToken, (user) => resolve(user)));

  // This will get the user data or false (if the user is not connected)
  const user = await UserPromise; 

  return user;
}

exports.jwtVerify = jwtVerify;
