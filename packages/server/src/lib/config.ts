import 'dotenv/config';

export default {
  NODE_ENV: String(process.env.NODE_ENV),
  HOST: String(process.env.HOST),
  PORT: Number(process.env.PORT),
};
