import { IEmailMessage } from '@/application/email/interfaces/email-message.interface'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as nodemailer from 'nodemailer'

@Injectable()
export class EmailMessageImpl implements IEmailMessage {
  constructor(private readonly configService: ConfigService) {}

  send(destinatario: string): void {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('NODEMAILER_USER'),
        pass: this.configService.get<string>('NODEMAILER_PASS'),
      },
    })

    const mailOptions = {
      from: this.configService.get<string>('NODEMAILER_USER'),
      to: destinatario,
      subject:
        'Cadastro realizado com sucesso na plataforma Delivery de Padarias',
      text: 'Olá! Este é um e-mail para informar que agora você possui acesso à plataforma Delivery de Padarias.',
      html: '<h2>Olá!</h2><p>Este é um e-mail enviado via <strong>Nodemailer</strong> usando SMTP.</p>',
    }

    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        return error
      } else {
        return info.response
      }
    })
  }
}
