import { NodemailerService } from '@/infrastructure/model/services/nodemailer.service'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Module({
  providers: [ConfigService, NodemailerService],
  exports: [NodemailerService],
})
export class NodemailerModule {}
