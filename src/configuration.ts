export default () => ({
  port: parseInt(process.env.PORT, 10),
  databaseConnectionUri: process.env.MONGODB_URI,
});
