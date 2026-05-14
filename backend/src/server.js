import app from './app.js';

const port = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`FileFlex Tools API running on port ${port}`);
  });
}

export default app;
