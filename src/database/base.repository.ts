import { Injectable, Inject } from '@nestjs/common';
import { Connection, Schema, Model } from 'mongoose';
import { getOrCreateModel } from './model-factory';

@Injectable()
export class BaseRepository {
  constructor(@Inject('MONGO_CONNECTION') private readonly conn: Connection) {}

  private getModel(name: string, schema: Schema): Model<any> {
    return getOrCreateModel(this.conn, name, schema);
  }

  async insert(name: string, schema: Schema, data: any) {
    const model = this.getModel(name, schema);
    return new model(data).save();
  }

  async find(modelName: string, schema: any, {
  filter = {},
  projection = {},
  options = {}
}: {
  filter?: any;
  projection?: any;
  options?: any;
}) {
  const model = this.conn.model(modelName, schema.schema);
  return model.find(filter, projection, options).lean();
}

  async update(name: string, schema: Schema, filter = {}, update = {}) {
    const model = this.getModel(name, schema);
    return model.updateOne(filter, update).exec();
  }

  async delete(name: string, schema: Schema, filter = {}) {
    const model = this.getModel(name, schema);
    return model.deleteOne(filter).exec();
  }
}
