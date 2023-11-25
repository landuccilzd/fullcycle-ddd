
import Notification from "./notification";

describe("Unit tests for notification", () => {

    it("Should create erros", () => {
        const notification = new Notification();
        const error = {
            message: "Mensagem de erro",
            context: "Customer"
        }

        notification.addError(error);
        expect(notification.messages("Customer")).toBe("Customer: Mensagem de erro, ");

        const anotherError = {
            message: "Mensagem de erro 2",
            context: "Customer"
        }

        notification.addError(anotherError);
        expect(notification.messages("Customer")).toBe("Customer: Mensagem de erro, Customer: Mensagem de erro 2, ");

        const yetAnotherError = {
            message: "Mensagem de erro 3",
            context: "Product"
        }

        notification.addError(yetAnotherError);
        expect(notification.messages("Customer")).toBe("Customer: Mensagem de erro, Customer: Mensagem de erro 2, ");
        expect(notification.messages("Product")).toBe("Product: Mensagem de erro 3, ");
        expect(notification.messages()).toBe("Customer: Mensagem de erro, Customer: Mensagem de erro 2, Product: Mensagem de erro 3, ");
    });

    it("Should check if notification has at least one error", () => {
        const notification = new Notification();
        const error = {
            message: "Mensagem de erro",
            context: "Customer"
        }

        notification.addError(error);
        expect(notification.hasErrors()).toBe(true);
    });

    it("Should get all error props", () => {
        const notification = new Notification();
        const error = {
            message: "Mensagem de erro",
            context: "Customer"
        }

        notification.addError(error);
        expect(notification.errors).toEqual([error]);
    });
});