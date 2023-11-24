import ProductRepositoryInterface from "../../../domain/repository/product-repository.interface";
import { InputUpdateProductDTO, OutputUpdateProductDTO } from "./update.product.dto";


export default class UpdateProductUseCase {

    private repository: ProductRepositoryInterface;

    constructor(repository: ProductRepositoryInterface) {
        this.repository = repository;        
    }

    async execute(input: InputUpdateProductDTO): Promise<OutputUpdateProductDTO> {
        const product = await this.repository.find(input.id)
        product.changeName(input.name);
        product.changePrice(input.price);

        await this.repository.update(product);

        const retorno = {
            id: product.id,
            name: product.name,
            price: product.price
        }
        return retorno;
    }
}