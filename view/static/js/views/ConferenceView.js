import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.id = params.id;

        this.setTitle("Loading...");
        this.data = null;

        this.getConference();

        /*
            TODO: 
            1. Au chargement, rejoindre la Room de la conférence
            2. Récupérer l'historique des précédents messages
            3. Demandez à l'utilisateur de saisir son nom / pseudo
            4. Commencez à envoyer des messages et les recevoir 
        */

        // Pour vous aider à démarrer
        var socket = io();
        // Emission d'un message 
        socket.emit('test', 'Hello !');

        // Réception d'un message
        socket.on('test', function(msg) {
            console.log(msg);
        })
    }


    async getConference(){
        try {
            let res = await fetch(`${location.origin}/api/conferences/${this.id}`);
            let json = await res.json();
            this.data = json;
            this.setTitle(json.title);
            this.reload();
        } catch(e){
            console.error(e);
        }
    }


    async getHtml() {
        if(this.data == null){return 'Loading'}

        return `
            <main id="l-conference" class="d-flex-stretch">
                <section class="half m-2">
                    <h1>${this.data.title}</h1>
                    <p>${this.data.description}</p>

                </section>

                <section class="half" id="chat">
                    <ul id="messages"></ul>
                    <form id="form" action="">
                    <input id="input" autocomplete="off" /><button>Send</button>
                    </form>
                </section>
            </main>
        `;
    }
}
