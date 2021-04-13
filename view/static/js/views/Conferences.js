import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");

        this.getConferences();
    }

    async getConferences(){
        try {
            let res = await fetch(location.origin + '/api/conferences');
            let json = await res.json();
            this.updateConferences(json);
        } catch(e){
            console.error(e);
        }
        
    }
    updateConferences(conferences){
        let DOMList = document.getElementById('conference-list');

        conferences.map(el => {
            let li = document.createElement('li');
            let a = document.createElement('a');
            
            a.textContent = el.title;
            a.href = `/conferences/${el._id}`
            li.appendChild(a);
            DOMList.appendChild(li);
        })
    }

    async getHtml() {
        return `
            <div class="m-2">
                <h1>Conferences</h1>
                <ul id="conference-list">
                    
                </ul>
            </div>
        `;
    }
}