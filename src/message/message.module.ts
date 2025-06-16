import { Module } from "@nestjs/common";
import { MessageController } from "./controllers/message.controller";
import { MessageService } from "./services/message.service";

@Module({
    imports: [],
    controllers: [MessageController],
    providers: [MessageService],
    exports: [],
   
})
export class MessageModule {}