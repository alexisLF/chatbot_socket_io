import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Settings");
    }

    async getHtml() {
        return `
            <div class="m-2">
                <h1>Settings</h1>
                <p>Manage your privacy and configuration.</p>
            </div>
        `;
    }
}