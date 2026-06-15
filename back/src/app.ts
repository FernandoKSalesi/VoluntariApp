import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import routes from './presentation/routes/index';
import { swaggerSpec } from './presentation/swagger';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(routes);

export { app };
