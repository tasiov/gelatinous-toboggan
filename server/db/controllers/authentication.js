import jwt from 'jwt-simple';
import config from '../../config/config.js';

// sub: subject property
const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.username, iat: timestamp }, config.secret);
}

export default {
  tokenForUser,
}
