export class ApprovalRoute {
    _id: string;
    formTitle: String;
    sender: String;
    receivers: String[];
    approvalsRequired: Number;


    constructor() {
        this._id = '';
        this.formTitle = '';
        this.sender = '';
        this.receivers = [];
        this.approvalsRequired = 0;
    }
}