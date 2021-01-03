import { Injectable } from '@nestjs/common';
import { Table } from './table.schema';
import { TableRepository } from './table.repository';
import { TableDto } from './dto/table.dto';

@Injectable()
export class TableService {
  constructor(private tableRepository: TableRepository) {}

  async getTablesByUser(userId: number): Promise<Table[]> {
    return this.tableRepository.getAllByUserId(userId);
  }

  async createTable(userId: number, table: TableDto): Promise<Table> {
    return this.tableRepository.create(userId, table);
  }

  async updateTable(userId: number, table: TableDto): Promise<Table> {
    return this.tableRepository.update(userId, table);
  }

  async deleteTable(userId: number, id: number): Promise<number> {
    return this.tableRepository.delete(userId, id);
  }
}
