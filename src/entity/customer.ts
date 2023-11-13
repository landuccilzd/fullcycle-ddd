import Address from "./address";

export default class Customer {

    _id: string;
    _name: string;
    _address!: Address;
    _active: boolean = false;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("O ID é obrigatório");
        }

        if (this._name.length === 0) {
            throw new Error("O nome é obrigatório");
        }
    }

    get name(): string {
        return this._name;
    }

    isActive(): boolean {
        return this._active;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {
        if (this._address === undefined) {
            throw Error("O endereço é obrigatório para a ativação do cliente")
        }

        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    set Address(address: Address) {
        this._address = address
    }

}