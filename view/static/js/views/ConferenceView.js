import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    
    constructor(params) {
        super(params);
        this.id = params.id;

        this.setTitle("Loading...");
        this.data = null;
        this.socket = io();
        this.getConference().then(() => {
            let room = this.data;
            console.log('room : ', room)
            this.socket.emit('join', room);

            this.communicate()
            let listMsg = document.getElementById('messages');
            //receive message

            this.socket.on('receive-message', function (msg) {
                var item = document.createElement('li');
                item.innerText = msg.message;
    
                listMsg.append(item)
    
            })
        });

        /*
            TODO: 
            1. Au chargement, rejoindre la Room de la conférence
            2. Récupérer l'historique des précédents messages
            3. Demandez à l'utilisateur de saisir son nom / pseudo
            4. Commencez à envoyer des messages et les recevoir 
        */
       


    }

    communicate() {
        // Pour vous aider à démarrer

        let message = "";
        let form = document.getElementById('sendMsg');
        

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            message = form.message.value;
            console.log(message)
            let messageModel = {
                message: message,
                user: "User1",
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
          case "edit":
            fetch(`${location.origin}/api/messages/${item.id}`, {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(item),
            });
            break;
          case "delete":
            fetch(`${location.origin}/api/visits/${item.id}`, {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(item),
            });
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
                    <form id="sendMsg" name="sendMsg" action="">
                    <input id="message" name="message" autocomplete="off" /><button>Send</button>
                    </form>
                </section>
            </main>
        `;
    }
}
