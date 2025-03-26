import { NodemailerService } from '@/infrastructure/services/email/nodemailer.service'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Module({
  providers: [ConfigService, NodemailerService],
  exports: [NodemailerService],
})
export class NodemailerModule {}
