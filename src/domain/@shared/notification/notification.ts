export type NotificationErrorProps = {
    message: string,
    context: string
}

export default class Notification {
    private _errors: NotificationErrorProps[] = [];

    addError(error: NotificationErrorProps) {
        this._errors.push(error);
    }

    messages(context?: string): string {
        let msg = "";
        this._errors.forEach((error) => {
            if (context === undefined || context === error.context) {
                msg += `${error.context}: ${error.message}, `;
            }
        });
        return msg;
    }

    hasErrors(): boolean {
        return this._errors.length > 0;
    }

    get errors(): NotificationErrorProps[] {
        return this._errors;
    }
}