import { randomBytes } from 'crypto';

const secretKey = randomBytes(32).toString('base64');
console.log(secretKey);