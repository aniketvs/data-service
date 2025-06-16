import { Connection, Schema, Model } from 'mongoose';

const registry = new Map<string, Model<any>>();

export const getOrCreateModel = (
  conn: Connection,
  name: string,
  schema: Schema,
): Model<any> => {
  if (registry.has(name)) return registry.get(name)!;
  if (conn.models[name]) return conn.models[name];

  const model = conn.model(name, schema);
  registry.set(name, model);
  return model;
};
