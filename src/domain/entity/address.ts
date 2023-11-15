export default class Address {

    private _street: string = "";
    private _number: number = 0;
    private _zip: string = "";
    private _city: string = "";

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

    get street(): string {
        return this._street;
    }

    get number(): number {
        return this._number;
    }

    get zip(): string {
        return this._zip;
    }

    get city(): string {
        return this._city;
    }

    toString() {
        return "${this._street}, ${this._numero} - ${this.cep} - ${this.cidade}";
    }
}