import express from 'express';
import authCtrl from '../controllers/auth.controller.js';
import { requireSignin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signin', authCtrl.signin);
router.post('/signup', authCtrl.signup);
router.post('/register', authCtrl.register);
router.get('/signout', authCtrl.signout);

// Protected route example - get current user
router.get('/user', requireSignin, (req, res) => {
  res.status(200).json({ user: req.auth });
});

export default router;
