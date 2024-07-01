import { Module } from '@nestjs/common';
import { QsService } from './qs.service';
import { QsController } from './qs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QS } from './entities/qs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QS])],
  controllers: [QsController],
  providers: [QsService],
})
export class QsModule {}
