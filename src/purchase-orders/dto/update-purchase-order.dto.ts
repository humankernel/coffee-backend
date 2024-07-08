import { PurchaseOrder } from '../entities/purchase-order.entity';
import { PartialType } from '@nestjs/swagger';

export class UpdatePurchaseOrderDto extends PartialType(PurchaseOrder) {}
