import { EmailMessageImpl } from '@/infrastructure/email/email-message.impl'
import { Module } from '@nestjs/common'

@Module({
  providers: [EmailMessageImpl],
  exports: [EmailMessageImpl],
})
export class NodemailerModule {}
