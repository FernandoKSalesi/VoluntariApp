import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './presentation/routes/index';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: '*'
}));

app.use(express.json());
console.log(routes); app.use(routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
