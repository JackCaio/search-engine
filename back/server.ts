import express, { Request, Response } from 'express';
import MercadoLivre from './src/model/MercadoLivre';
import SearchService from './src/service/SearchService';

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({origin: '*'}));

app.get('/', (_req, res) => res.json({message: 'Sanity'}));

interface IParams {
  web: string,
  category: string,
}

interface IQuery {
  q: string | undefined
}

app.get('/:web/:category', async (
  req: Request<IParams, {}, {}, IQuery>,
  res: Response
) => {
  try {
    const { category, web } = req.params
    const {q: query} = req.query
    const result = await SearchService.getProducts(web, category, query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(3001, () => console.log('Started on port 3001'));