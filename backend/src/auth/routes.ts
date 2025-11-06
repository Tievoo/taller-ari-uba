import { Router } from 'express';
import { login, register } from './utils';

const router = Router();

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const token = await login(email, password);
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 12 * 60 * 60 * 1000
        })
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        next(error);
    }
});

router.post('/register', async (req, res, next) => {
    const { email, password, first_name, last_name } = req.body;
    try {
        const token = await register({ email, password, first_name, last_name });
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 12 * 60 * 60 * 1000
        });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        next(error);
    }
});

export default router;