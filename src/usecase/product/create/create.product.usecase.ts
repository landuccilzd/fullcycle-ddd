import { v4 as uuid } from "uuid";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import Product from "../../../domain/product/entity/product";

export default class CreateProductUseCase {

    private repository: ProductRepositoryInterface;

    constructor(repository: ProductRepositoryInterface) {
        this.repository = repository;
    }

    async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
        const customerId = uuid();
        const product = new Product(customerId, input.name, input.price);

        await this.repository.create(product);

        const retorno = {
            id: product.id,
            name: product.name,
            price: product.price
        }
        return retorno;
    }
}