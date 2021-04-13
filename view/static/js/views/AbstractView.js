export default class {
    constructor(params) {
        this.params = params;
    }

    setTitle(title) {
        document.title = title;
    }

    async reload(){
        document.querySelector("#app").innerHTML = await this.getHtml()
    }

    async getHtml() {
        return "";
    }
}