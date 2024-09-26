import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MessageDto } from './dto/message.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ChatbotService {
  private readonly rasaUrl = 'http://0.0.0.0:5005/webhooks/rest/webhook';

  constructor(private readonly httpService: HttpService) {}

  async sendMessage(messageDto: MessageDto): Promise<string> {
    const headers = { 'Content-Type': 'application/json' };
    const request = {
      sender: messageDto.sender,
      message: messageDto.message,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(this.rasaUrl, request, { headers }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}