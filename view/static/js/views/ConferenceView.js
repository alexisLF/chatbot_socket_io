import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    /*
        TODO: 
        1. Au chargement, rejoindre la Room de la conférence OK
        2. Récupérer l'historique des précédents messages OK
        3. Demandez à l'utilisateur de saisir son nom / pseudo OK
        4. Commencez à envoyer des messages et les recevoir  OK
    */

    constructor(params) {
        super(params);
        this.id = params.id;

        this.setTitle("Loading...");
        this.data = null;
        this.socket = io();
        this.getConference().then(() => {
            this.chatForm = document.getElementById('sendMsg');

            let room = this.data;
            this.socket.emit('join', room);
            this.usernameForm = document.getElementById('usernameForm');
            this.usernameForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.username = this.getUsername();
                this.retrieveHistory(room);

            });

            this.communicate()
            this.listMsg = document.getElementById('messages');
            //receive message

            this.socket.on('receive-message', function (msg) {
                appendMessageToDom(msg);

            })
        });

    }

    retrieveHistory(room) {
        fetch(`${location.origin}/api/messages/${room._id}`).then((res) => {

            let json = res.json();
            json.then((value) => {
                value.forEach(element => {
                    appendMessageToDom(element);
                });
            })

        })
    }

    getUsername() {
        this.usernameForm.style.display = 'none';
        this.chatForm.style.display = 'block';
        return this.usernameForm.username.value
    }

    communicate() {
        let message = "";

        this.chatForm.addEventListener('submit', (e) => {
            e.preventDefault();

            message = this.chatForm.message.value;
            console.log(message)
            let messageModel = {
                message: message,
                user: this.username,
                conference: this.data,
            }
            // Send message 
            this.socket.emit('send-message', messageModel);
            this.msgObjectUpdated('add', messageModel)
        });


    }

    msgObjectUpdated(type, item) {
        switch (type) {
            case "add":
                fetch(`${location.origin}/api/messages`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(item),
                }).then(res => res.json())
                    .then(json => item._id = json.response);
                break;
            default:
                break;
        }
    }

    async getConference() {
        try {
            let res = await fetch(`${location.origin}/api/conferences/${this.id}`);
            let json = await res.json();
            this.data = json;
            this.setTitle(json.title);
            this.reload();
        } catch (e) {
            console.error(e);
        }
    }

    async getHtml() {
        if (this.data == null) { return 'Loading' }

        return `
            <main id="l-conference" class="d-flex-stretch">
                <section class="half m-2">
                    <h1>${this.data.title}</h1>
                    <p>${this.data.description}</p>

                </section>

                <section class="half" id="chat">
                    <ul id="messages" name="messages"></ul>
                    <form id="usernameForm" name="usernameForm" style="display:block">
                    <label for="username">Enter your username :</label>
                    <input id="username" name="username" autocomplete="off" /><button>Enter room !</button>
                    </form>
                    <form id="sendMsg" name="sendMsg" action="" style="display:none">
                    <input id="message" name="message" autocomplete="off" /><button>Send</button>
                    </form>
                </section>
            </main>
        `;
    }

}

function appendMessageToDom(msg) {
    let listMsg = document.getElementById('messages');
    var item = document.createElement('li');
    var user = document.createElement('div')
    user.className = 'usernameclass'
    user.innerText = msg.user + ' a dit : ';
    var message = document.createElement('div')
    message.className = 'messageclass'
    message.innerText = msg.message;

    item.append(user)
    item.append(message)
    listMsg.append(item)
}
