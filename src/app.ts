import express from 'express';
import './database';

const app = express();

app.listen(3000, () => {
    console.log('server running on port 3000!')
});