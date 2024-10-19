import cors from 'cors';

const securityConfig = (app) => {
  app.use(cors());
  // Add other security-related configurations
};

export default securityConfig;

