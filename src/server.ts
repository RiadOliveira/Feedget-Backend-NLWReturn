import express from 'express';
import cors from 'cors';
import routes from './routes/index';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(
    process.env.PORT || '3333', 
    () => console.log('Listening on port 3333!')
);
