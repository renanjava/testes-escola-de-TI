import type { ISendEmail } from '@/application/email/interfaces/send-email.interface'
import type IUseCases from '@/application/usecases/interfaces/use-cases.interface'

export class SendEmailUseCase implements IUseCases {
  constructor(private readonly iSendEmail: ISendEmail) {}
  execute(destinatario: string): void {
    this.iSendEmail.sendEmail(destinatario)
  }
}
