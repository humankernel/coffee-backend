import { Module } from '@nestjs/common';
import { QsService } from './qs.service';
import { QsController } from './qs.controller';

@Module({
  controllers: [QsController],
  providers: [QsService],
})
export class QsModule {}
