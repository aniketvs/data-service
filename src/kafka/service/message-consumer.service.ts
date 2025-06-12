import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { kafka } from '../kafka.config'; // your shared Kafka config
import { Consumer } from 'kafkajs';

@Injectable()
export class MessageConsumerService implements OnModuleInit {
  private readonly logger = new Logger(MessageConsumerService.name);
  private consumer: Consumer;

  async onModuleInit() {
    this.consumer = kafka.consumer({ groupId: 'chat-message-consumer-group' });

    await this.consumer.connect();
    this.logger.log('✅ Kafka Consumer connected');

    await this.consumer.subscribe({ topic: 'chat-messages', fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const key = message.key?.toString();
        const value = message.value?.toString();
        this.logger.log(`📥 Received message on topic [${topic}] partition [${partition}]:
        Key: ${key}
        Value: ${value}`);
      },
    });
  }
}
