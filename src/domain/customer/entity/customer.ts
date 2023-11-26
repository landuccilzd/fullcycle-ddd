import AbstractEntity from "../../@shared/entity/abstract.entity";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";

export default class Customer extends AbstractEntity {

    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate() {
        CustomerValidatorFactory.create().validate(this);
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.errors)
        }
    }

    get name(): string {
        return this._name;
    }

    get address(): Address {
        return this._address;
    }

    get rewardPoints(): number {
        return this._rewardPoints
    }

    isActive(): boolean {
        return this._active;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    addRewardPoints(rewardPoint: number) {
        this._rewardPoints += rewardPoint;
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

    toString() {
        return "[" + this.id + "] " + this._name;
    }
}