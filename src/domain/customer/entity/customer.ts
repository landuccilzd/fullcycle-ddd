import AbstractEntity from "../../@shared/entity/abstract.entity";
import NotificationError from "../../@shared/notification/notification.error";
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

        if (this._id.length === 0) {
            this.notification.addError({
                context: "Customer",
                message: "O ID é obrigatório"
            });
        }

        if (this._name.length === 0) {
            this.notification.addError({
                context: "Customer",
                message: "O nome é obrigatório"
            });
        }

        if (this._rewardPoints < 0) {
            this.notification.addError({
                context: "Customer",
                message: "Os pontos de recompensa não podem ser negativos"
            });
        }

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
        // if (this.notification.hasErrors()) {
        //     throw new NotificationError(this.notification.errors)
        // }        
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