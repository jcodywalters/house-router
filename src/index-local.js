import { handler } from './index';

console.log(`env=${process.env.ENV}`);
handler({}, {})