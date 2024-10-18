import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailDto } from '../dto/MailDto.dto';
import * as jwt from 'jsonwebtoken'; // Import jsonwebtoken or use Nest's JwtService
import { ConfigService } from '@nestjs/config'; // To access environment variables
import { from } from 'rxjs';

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmail(sendMailDto: SendMailDto) {
    const { recipients, subject, html } = sendMailDto;
    try {
      const emailSend = await this.mailerService.sendMail({
        to: recipients,
        from: {
          name: '4GYM',
          address: 'hukhan013@gmail.com',
        },
        subject: subject,
        html: html,
      });
      return emailSend;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new HttpException(
        'Error sending email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Method to generate a reset password token (e.g. JWT)
  async generateToken(userId: number): Promise<string> {
    const secret = this.configService.get<string>('JWT_SECRET'); // Access the JWT secret from environment variables
    const token = jwt.sign({ userId }, secret, { expiresIn: '1h' }); // Token expires in 1 hour
    console.log('Token:', token);
    return token;
  }

  // Method to send reset password email
  async sendMailResetPassword(email: string, token: string): Promise<void> {
    const resetPasswordUrl = `http://localhost:8989/reset-password?token=${token}`;
    const sendMailDto = {
      recipients: [email],
      subject: 'Yêu cầu đặt lại mật khẩu',
      html: `<p>Nhấn vào link dưới để cập nhật lại mật khẩu:</p>
             <a href="${resetPasswordUrl}">Đặt lại mật khẩu</a>`,
      from: null,
    };

    try {
      await this.sendEmail(sendMailDto); // Reuse sendEmail method
    } catch (error) {
      console.error('Lỗi khi gửi email đặt lại mật khẩu:', error);
      throw new HttpException(
        'Lỗi khi gửi email đặt lại mật khẩu',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
