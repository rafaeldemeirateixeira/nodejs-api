import dotenv from 'dotenv';

dotenv.config();

export const auth: any = {
    jwt_secret: process.env.JWT_SECRET,
    expires_in: 86400
}
