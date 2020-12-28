import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Table } from './table.schema';
import { InjectModel } from '@nestjs/mongoose';
import { TableDto } from './dto/table.dto';

async function purify(table: Table): Promise<Table> {
  const tempTable = table.toObject();
  delete tempTable._id;
  delete tempTable.__v;
  return tempTable;
}

@Injectable()
export class TableRepository {
  constructor(
    @InjectModel(Table.name)
    private tableModel: Model<Table>,
  ) {}

  async getAllByUserId(userId: number): Promise<Table[]> {
    return this.tableModel.find({ userId });
  }

  async create(userId: number, tableDto: TableDto): Promise<Table> {
    try {
      const table = await this.tableModel.create({ userId, ...tableDto });
      return purify(table);
    } catch (error) {
      if (error.code === 11000) {
        // duplicate item
        throw new ConflictException(
          `Table with id ${tableDto.id} already exists`,
        );
      }
      throw error;
    }
  }

  async update(tableDto: TableDto): Promise<Table> {
    const table = await this.tableModel.findOneAndUpdate(
      { id: tableDto.id },
      tableDto,
      {
        new: true,
      },
    );
    if (!table) {
      throw new NotFoundException(
        `Table with id ${tableDto.id} does not exist`,
      );
    }
    return purify(table);
  }

  async delete(id: number): Promise<number> {
    await this.tableModel.findOneAndDelete({ id });
    return id;
  }
}
