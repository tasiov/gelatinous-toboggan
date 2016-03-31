import jwt from 'jwt-simple';
import config from '../../config/config.js';

// sub: subject property
const tokenForUser = (email) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: email, iat: timestamp }, config.secret);
}

export default {
  tokenForUser,
}
