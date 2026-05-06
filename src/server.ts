console.log('Environment variables:', {
  PORT: process.env.PORT,
  RESEND_API_KEY: process.env.RESEND_API_KEY ? '***' : 'MISSING',
  SUPABASE_KEY: process.env.SUPABASE_PUBLISHABLE_KEY ? '***' : 'MISSING'
});

const server = app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
});
