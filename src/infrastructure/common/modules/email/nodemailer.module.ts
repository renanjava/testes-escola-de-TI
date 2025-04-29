import { EmailMessageImpl } from '@/infrastructure/email/email-message.impl'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Module({
  providers: [ConfigService, EmailMessageImpl],
  exports: [EmailMessageImpl],
})
export class NodemailerModule {}
