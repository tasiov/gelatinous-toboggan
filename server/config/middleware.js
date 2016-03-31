import morgan from 'morgan';
import bodyParser from 'body-parser';

const middleware = (app) => {
  app.use(morgan('dev'));
};

export default middleware;
