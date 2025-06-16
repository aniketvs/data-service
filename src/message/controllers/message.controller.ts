import { Controller, Get, Param } from '@nestjs/common';
import { MessageService } from '../services/message.service';

@Controller('api/v1/chat')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':id/messages')
  async getUserMessages(@Param('id') id: string) {
    try {
      const messages = await this.messageService.getMessages(id);
      console.log(messages);
      return { success: true, data: messages };
    } catch (error) {
      console.error('❌ Error fetching user messages:', error);
      throw new Error('Failed to fetch user messages');
    }
  }
}
