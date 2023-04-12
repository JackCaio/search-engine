import express from 'express';
import MercadoLivre from './src/model/MercadoLivre';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => res.json({message: 'Sanity'}));

app.get('/test', async (_req, res) => {
  const result = await MercadoLivre.search('TV', 'samsung');
  res.json({result});
})

app.listen(3001, () => console.log('Started on port 3001'));