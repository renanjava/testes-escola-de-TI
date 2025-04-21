import { DatabaseConnection } from '@/infrastructure/database/database.connection'
import { Module } from '@nestjs/common'

@Module({
  providers: [DatabaseConnection],
  exports: [DatabaseConnection],
})
export class PrismaModule {}
