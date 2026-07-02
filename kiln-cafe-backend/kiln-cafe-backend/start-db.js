const EmbeddedPostgres = require('embedded-postgres');
const path = require('path');
const fs = require('fs');

async function main() {
  const dbDir = path.join(__dirname, '.db_data');
  
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const pg = new EmbeddedPostgres({
    databaseDir: dbDir,
    user: 'kiln_user',
    password: 'kiln_pass',
    port: 3646,
    persistent: true,
  });

  console.log('Initializing database cluster...');
  await pg.initialise();

  console.log('Starting PostgreSQL server on port 3646...');
  await pg.start();

  console.log('Creating database "kiln_cafe" if not exists...');
  try {
    await pg.createDatabase('kiln_cafe');
    console.log('Database "kiln_cafe" created or verified.');
  } catch (e) {
    console.log('Database initialization check output (might already exist):', e.message);
  }

  console.log('PostgreSQL database is running and ready.');
  
  // Keep process alive
  setInterval(() => {}, 1000);

  // Stop handler
  const stopPg = async () => {
    console.log('Stopping PostgreSQL server...');
    try {
      await pg.stop();
      console.log('PostgreSQL server stopped.');
    } catch (e) {
      console.error('Error stopping PostgreSQL server:', e.message);
    }
    process.exit(0);
  };

  process.on('SIGINT', stopPg);
  process.on('SIGTERM', stopPg);
}

main().catch(err => {
  console.error('Failed to start database:', err);
  process.exit(1);
});
