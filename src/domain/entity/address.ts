export default class Address {

    _street: string = "";
    _number: number = 0;
    _zip: string = "";
    _city: string = "";

    constructor(street: string, number: number, zip: string, city: string) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;
        this.validate();
    }

    validate() {
        if (this._street.length === 0) {
            throw new Error("A rua é obrigatória");
        }
        if (this._number === 0) {
            throw new Error("O número é obrigatório");
        }
        if (this._zip.length === 0) {
            throw new Error("O cep é obrigatório");
        }
        if (this._city.length === 0) {
            throw new Error("A cidade é obrigatória");
        }        
    }

    toString() {
        return "${this._street}, ${this._numero} - ${this.cep} - ${this.cidade}";
    }
}