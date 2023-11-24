import CustomerRepositoryInterface from "../../../domain/repository/customer-repository.interface";
import { InputFindCustomerDto, OutputFindCustomerDTO } from "./find.customer.dto";

export default class FindCustomerUseCase {

    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;        
    }

    async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDTO> {

        const customer = await this.customerRepository.find(input.id)
        const retorno = {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                city: customer.address.city,
                number: customer.address.number,
                zip: customer.address.zip
            }
        }
        return retorno;
    }
}