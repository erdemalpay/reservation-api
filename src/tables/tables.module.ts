import { Module } from '@nestjs/common';
import { TableController as TablesController } from './table.controller';
import { TableService } from './table.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Table, TableSchema } from './table.schema';
import { TableRepository } from './table.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Table.name, schema: TableSchema }]),
    AuthModule,
  ],
  controllers: [TablesController],
  providers: [TableService, TableRepository],
})
export class TablesModule {}
