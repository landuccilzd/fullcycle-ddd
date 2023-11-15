import OrderItem from "../../domain/entity/ordem_item";
import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/orderer-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                product_id: item.productId,
                order_id: entity.id,
                quantity: item.quantity
            })),
        },
        {
            include: [{ model: OrderItemModel }]
        });
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update(
            {
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    product_id: item.productId,
                    order_id: entity.id,
                    quantity: item.quantity
                }))
            },
            {
                where: {
                    id: entity.id
                }
            }
        );
    }

    async find(id: string): Promise<Order> {
        let orderModel;
        try {
            orderModel = await OrderModel.findOne({ 
                where: { id },
                include: [{
                    model: OrderItemModel,
                    include: [ "product" ]
                }],
                rejectOnEmpty: true
            });
        } catch (error) {
            throw new Error("Pedido não encontrado");
        }

        let orderItems:OrderItem[] = [];
        orderModel.items.forEach((item) => {
            orderItems.push(new OrderItem(item.id, item.quantity, item.product.price, item.product_id));
        });
        const order = new Order(id, orderModel.customer_id, orderItems);
        return order;
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            include: [{
                model: OrderItemModel,
                include: [ "product" ]
            }]
        });
        const orders = orderModels.map((orderModel) => {
            let orderItems:OrderItem[] = [];
            orderModel.items.forEach((item) => {
                orderItems.push(new OrderItem(item.id, item.quantity, item.product.price, item.product_id));
            });

            let order = new Order(orderModel.id, orderModel.customer_id, orderItems);
            return order;
        });
        return orders;
    }

}