import Product from "../../../domain/entity/product";
import ProductRepositoryInterface from "../../../domain/repository/product-repository.interface";
import { InputListProductDTO, OutputListProductDTO } from "./list.product.dto";

export default class ListProductUseCase {

    private repository: ProductRepositoryInterface;

    constructor(repository: ProductRepositoryInterface) {
        this.repository = repository;        
    }

    async execute(input: InputListProductDTO): Promise<OutputListProductDTO> {
        const products = await this.repository.findAll();
        return OutputMapper.toOutput(products);
    }
}

class OutputMapper {
    static toOutput(products: Product[]): OutputListProductDTO {
        return {
            products: products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price
            }))
        };
    }
}