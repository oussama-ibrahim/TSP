import express from 'express'
import bodyParser from 'body-parser'
import { connectDb} from './db/connectDB';
import config from './config'
import locationRoutes from './routes/location'
import cors from 'cors';


const app =express()
app.use(bodyParser.json())

app.use(cors({origin:'*'}));
app.use('/api/v1/locations',locationRoutes)

const port=config.port
connectDb()
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
