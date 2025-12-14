// server/express.js
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Template from './template.js'; // server-local template

// ✅ Import route files (make sure all of them export default router)
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import contactRoutes from './routes/contact.routes.js';
import projectRoutes from './routes/project.routes.js';
import educationRoutes from './routes/education.routes.js';
import servicesRoutes from './routes/services.routes.js';

dotenv.config();

const app = express();

// ✅ Middleware
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true
}));

// ✅ Debug logger — shows every request in the server terminal
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.url}`);
  next();
});

// ✅ Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Skeleton';
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message || err));

// ✅ Routes (make sure each file uses `export default router`)
if (authRoutes) app.use('/api/auth', authRoutes);
if (userRoutes) app.use('/api/users', userRoutes);
if (contactRoutes) app.use('/api/contacts', contactRoutes);
if (projectRoutes) app.use('/api/projects', projectRoutes);
if (educationRoutes) app.use('/api/education', educationRoutes);
if (servicesRoutes) app.use('/api/services', servicesRoutes);

// ✅ Home route
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(Template());
});

// ✅ Error handler fallback
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ✅ Dynamic port setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

