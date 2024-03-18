import express from 'express';
import cors from 'cors';
import {getPlace, getPlaces} from "./controllers/places.controllers";
const app = express();

app.use(cors());
app.get('/:id', getPlace);
app.get('/', getPlaces);

app.listen(3100, ()=> {
    console.log('Server is running on port 3000');
})
