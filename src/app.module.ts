import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka/kafka.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true,
    })
    ,KafkaModule,DatabaseModule,MessageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
