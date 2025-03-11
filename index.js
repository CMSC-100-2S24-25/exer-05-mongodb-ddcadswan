import express from 'express';
import { router } from './router.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router(app); // Use the router

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
