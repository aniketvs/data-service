import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/database/base.repository';

@Injectable()
export class MessageService {
  constructor(private readonly db: BaseRepository) {}

   getMessages(id: string): Promise<any[]> {
    
    const messageSchema = require('../../schemas/message.schema').default;
    
    const userIds = id.split('_');
    if (userIds.length !== 2) {
      throw new Error('Invalid user ID format. Expected format: user1_user2');
    }

    const [uIdOne, uIdTwo] = userIds;

    return  this.db.find('Message', messageSchema, {
  filter: {
    $or: [
      { fromUserId: uIdOne, toUserId: uIdTwo },
      { fromUserId: uIdTwo, toUserId: uIdOne }
    ]
  },
  projection: {
    _id: 0,
    __v:0
  }
});

  }
}
