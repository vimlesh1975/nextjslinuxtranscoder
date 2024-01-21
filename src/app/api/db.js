import mysql from 'serverless-mysql';
const db = mysql({
  config: {
    host: process.env.host1,
    port: process.env.port1,
    database: process.env.database1,
    user: process.env.user1,
    password: process.env.password1,
  },
});
const excuteQuery = async ({ query, values }) => {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
};

export default excuteQuery;
