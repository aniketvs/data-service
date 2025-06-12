import { Module } from "@nestjs/common";
import { MessageConsumerService } from "./service/message-consumer.service";

@Module({
    providers: [MessageConsumerService],
    exports: [MessageConsumerService],
})
export class KafkaModule {

}