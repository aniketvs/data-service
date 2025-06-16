import { Connection } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';

export const loadSchemas = (conn: Connection) => {
  const schemasPath = path.join(__dirname, '../schemas');

  fs.readdirSync(schemasPath).forEach((file) => {
    if (file.endsWith('.schema.ts') || file.endsWith('.schema.js')) {
      const schemaModule = require(path.join(schemasPath, file));
      const schemaName = file.split('.')[0];

      const { schema, modelName } = schemaModule.default;

      conn.model(modelName || schemaName, schema);
    }
  });
};
