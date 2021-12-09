import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order
    ) { 
    
  }

  create(createOrderDto: CreateOrderDto): Promise<Order>{
    return this.orderModel.create(createOrderDto);
  }

  findAll(): Promise<Order[]> {
    return this.orderModel.findAll();
  }

  findOne(id: string): Promise<Order>{
    return this.orderModel.findByPk(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    return  order.update(updateOrderDto);
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    return order.destroy();
  }
}
