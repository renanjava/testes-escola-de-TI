import type { IEmailMessage } from '@/application/email/interfaces/email-message.interface'
import type IUseCases from '@/application/usecases/interfaces/use-cases.interface'

export class SendEmailUseCase implements IUseCases {
  constructor(private readonly iEmailMessage: IEmailMessage) {}
  execute(destinatario: string): void {
    this.iEmailMessage.send(destinatario)
  }
}
