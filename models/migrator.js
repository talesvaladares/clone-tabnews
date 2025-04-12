import { resolve } from 'node:path';
import database from 'infra/database.js';
import migrationRunner from 'node-pg-migrate';
import { ServiceError } from 'infra/errors';

const defaultMigrationOptions = {
  dryRun: true,
  dir: resolve('infra', 'migrations'),
  direction: 'up',
  // verbose: true,
  log: () => {}, //tunela os logs para lugar nenhum, para deixar o terminal mais limpo
  migrationsTable: 'pgmigrations',
};

async function listPendingMigrations() {
  let dbClient;
  try {
    const dbClient = await database.getNewClient();

    const pendingMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dbClient,
    });

    return pendingMigrations;
  } catch (error) {
    const serviceErrorObject = new ServiceError(error, 'Error ao rodar as migrations');
    throw serviceErrorObject;
  } finally {
    await dbClient?.end();
  }
}

async function runPendingMigrations() {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dbClient,
      dryRun: false,
    });

    return migratedMigrations;
  } catch (error) {
    const serviceErrorObject = new ServiceError(error, 'Error ao rodar as migrations');
    throw serviceErrorObject;
  } finally {
    await dbClient?.end();
  }
}

export const migrator = {
  listPendingMigrations,
  runPendingMigrations,
};
