export class SocketMessage {
    public error: boolean = false;
    public payload: any;
    public type: string;

    constructor(obj: SocketMessage | any = {}) {
        this.error = obj.error || false;
        this.payload = obj.payload || null;
        this.type = obj.type || null;
    }
}
