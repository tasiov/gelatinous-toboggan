import morgan from 'morgan';
import bodyParser from 'body-parser';

const middleware = (app) => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(bodyParser.json({ limit: '50mb' }));
};

export default middleware;
