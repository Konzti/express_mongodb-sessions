import express from 'express';
import dotenv from 'dotenv';

import { connectToDB } from './db/index.js';
import { setupMiddleware } from './middleware/index.js';
import { setUpRoutes } from './routes/index.js';

dotenv.config({ path: '.env' });
const port = process.env.PORT || 3002;

try {
  await connectToDB(process.env.MONGODB_URI);
  console.log("DB connected");

} catch (error) {
  throw new Error("No db connection.... -------> ", error);
}

const app = express();
setupMiddleware(app);
setUpRoutes(app);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

