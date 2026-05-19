import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import routes from './presentation/routes/index';
import { swaggerSpec } from './presentation/swagger';

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(routes);

export { app };
