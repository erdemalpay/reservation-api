import {
  Controller,
  Get,
  UseGuards,
  Post,
  Put,
  ValidationPipe,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { Table } from './table.schema';
import { TableService } from './table.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.schema';
import { GetUser } from '../auth/get-user.decorator';
import { TableDto } from './dto/table.dto';

@Controller('tables')
export class TableController {
  constructor(private tableService: TableService) {}

  @UseGuards(AuthGuard())
  @Get()
  getTables(@GetUser() user: User): Promise<Table[]> {
    return this.tableService.getTablesByUser(user.id);
  }

  @UseGuards(AuthGuard())
  @Post()
  createTable(
    @GetUser()
    user: User,
    @Body(ValidationPipe) table: TableDto,
  ): Promise<Table> {
    return this.tableService.createTable(user.id, table);
  }

  @UseGuards(AuthGuard())
  @Put()
  updateTable(
    @GetUser()
    user: User,
    @Body(ValidationPipe)
    table: TableDto,
  ): Promise<Table> {
    return this.tableService.updateTable(user.id, table);
  }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  deleteTable(
    @GetUser()
    user: User,
    @Param('id')
    id: number,
  ): Promise<number> {
    return this.tableService.deleteTable(user.id, id);
  }
}
