import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { kafka } from '../kafka.config'; // your shared Kafka config
import { Consumer } from 'kafkajs';
import { BaseRepository } from 'src/database/base.repository';
import messageSchemaDef from '../../schemas/message.schema';
@Injectable()
export class MessageConsumerService implements OnModuleInit {
  private readonly logger = new Logger(MessageConsumerService.name);
  private consumer: Consumer;
  constructor(
    private readonly db: BaseRepository
  ) { }
  async onModuleInit() {
    this.consumer = kafka.consumer({ groupId: 'chat-message-consumer-group' });

    await this.consumer.connect();
    this.logger.log('✅ Kafka Consumer connected');

    await this.consumer.subscribe({ topic: 'chat-messages', fromBeginning: true });

    await this.consumer.run({
      autoCommit:false,
      eachMessage: async ({ topic, partition, message }) => {
        const key = message.key?.toString();
        const valueBuffer = message.value;
        let value: any;
        try {
          value = valueBuffer ? JSON.parse(valueBuffer.toString()) : {};
        } catch (err) {
          this.logger.error('Failed to parse message value', err);
          value = {};
        }
        this.logger.log(`📥 Received message on topic [${topic}] partition [${partition}]:
        Key: ${key}
        Value: ${value ? JSON.stringify(value) : 'null'}`);
        try {
          await this.db.insert(
            messageSchemaDef.modelName,
            messageSchemaDef.schema,
            value
          );

          this.logger.log('💾 Message saved to DB');
          await this.consumer.commitOffsets([
            {
              topic,
              partition,
              offset: (Number(message.offset) + 1).toString(),
            },
          ]);
        } catch (err) {
          this.logger.error('❌ DB Insert failed', err);

        }
      },
    });
  }
}
