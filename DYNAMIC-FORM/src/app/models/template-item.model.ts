export class TemplateItem {
    question : String;
    type: String;
    obligatory: Boolean;
    values: String[];

    constructor() {
        this.question = "";
        this.type = "";
        this.obligatory = false;
        this.values = [];
    };
};
