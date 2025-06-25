import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
  clientId: 'chat-app',
  brokers: [process.env.KAFKA ?? 'kafka:9092'], 
});
