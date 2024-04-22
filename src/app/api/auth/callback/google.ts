import { NextApiRequest, NextApiResponse } from 'next';
import { signIn } from 'next-auth/react';

export default async function GoogleAuthCallback(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        console.log('Received Google authentication callback:', req.query);
        const response = await signIn('google', { callbackUrl: '/profile' });
        console.log('Google authentication successful:', response);
        
        // Handle response from signIn function
        if (response?.error) {
            console.error('Google authentication error:', response.error);
            throw new Error('Google authentication failed');
        }

        // Redirect the user to the appropriate page
        res.redirect('/profile');
    } catch (error) {
        console.error('Google authentication callback error:', error);
        res.status(500).end('Internal Server Error');
    }
}
