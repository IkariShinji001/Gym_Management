import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { MessageDto } from './dto/message.dto';
import { Response } from 'express';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('message')
  async sendMessage(@Body() messageDto: MessageDto, @Res() res: Response) {
    try {
      const response = await this.chatbotService.sendMessage(messageDto);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }
}
