import ProductRepositoryInterface from "../../../domain/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDTO } from "./find.product.dto";

export default class FindProductUseCase {

    private repository: ProductRepositoryInterface;

    constructor(repository: ProductRepositoryInterface) {
        this.repository = repository;        
    }

    async execute(input: InputFindProductDto): Promise<OutputFindProductDTO> {
        const product = await this.repository.find(input.id)
        const retorno = {
            id: product.id,
            name: product.name,
            price: product.price
        }
        return retorno;
    }
}