import morgan from 'morgan';
import bodyParser from 'body-parser';

const middleware = (app) => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};

export default middleware;
