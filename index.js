import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import helmet from 'helmet';
import  { limiter, authLimiter } from './middleware/rateLimit.js';
import cors from 'cors';
import  {notFoundHandler, errorHandler} from './middleware/notFound.js';


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use('/api/auth', authLimiter,authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/teams', teamRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
       .then(() => {
               console.log("MongoDB connected succefully");
              const PORT = process.env.PORT || 5000;
              app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
              });
       } )
       .catch(err => console.error('MongoDB connection error:', err));
