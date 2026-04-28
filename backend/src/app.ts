import express, { type Response, type Request } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllItems, getItemById, addItem, deleteItemById, updateItemById } from './controllers.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;

app.use(cors({ origin: process.env.CLIENT_URL ?? 'http://localhost:5173' }));
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req: Request, res: Response) => {
    res.send("Hello there!")
});

app.get('/collection', getAllItems)
app.get('/collection/:id', getItemById);
app.post('/collection', addItem);
app.delete('/collection/:id', deleteItemById);
app.patch('/collection/:id', updateItemById);

app.listen(port, () => console.log(`The server is running on port ${port}`));
