import { Global, Module } from '@nestjs/common';
import { MongoClientProvider } from './mongo-client.provider';
import { BaseRepository } from './base.repository';
@Global()
@Module({
  providers: [MongoClientProvider, BaseRepository],
  exports: [BaseRepository,MongoClientProvider],
})
export class DatabaseModule {}
