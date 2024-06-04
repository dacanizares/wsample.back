import path from 'path';
import { promises as fs } from 'fs';
import { Migrator, FileMigrationProvider,} from 'kysely';
import { db } from './Database';

async function migrateToLatest() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, '../migrations'),
    }),
  })

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`[server]: migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`[server]: failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    await db.destroy();
    console.error('[server]: failed to migrate');
    console.error(error);
    process.exit(1);
  }
}

export default migrateToLatest;
