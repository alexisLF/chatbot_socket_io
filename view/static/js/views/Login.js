import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
    this.reload().then(() => {

      this.btn_register = document.getElementById('register-choice');
      this.btn_login = document.getElementById('login-choice');
      
      this.box_login = document.getElementById('loginform');
      this.box_register = document.getElementById('register-form');
      this.box_choice = document.getElementById('choice');
      
      this.choice()
      this.login()
      this.register()
    });
  }

  register(){

    this.box_register.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let form = this.box_register;
      
        fetch(`${location.origin}/auth/register`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: form.elements.username.value,
            email: form.elements.email.value,
            password: form.elements.password.value
          })
        }).then((response) => {
          return response.json();
        }).then(json => {
          if(json.error){
            alert(json.error)
            return;
          } else {
            this.saveJWT(json.token);
          }
        })
      })

  }

  login(){
      
    this.box_login.addEventListener('submit', (e) => {
        e.preventDefault();
      
        let form = this.box_login;
      
        console.log(form.elements.password.value)
        
        fetch(`${location.origin}/auth/login`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: form.elements.email.value,
            password: form.elements.password.value
          })
        }).then((response) => {
          return response.json();
        }).then(json => {
          if(json.error){
            alert(json.error)
            return;
          } else {
            this.saveJWT(json.token);
          }
        })
      })

  }

  choice(){

    this.btn_register.addEventListener('click', () => {
        this.box_choice.style.display = 'none';
        this.box_register.style.display = 'block';
      })
      
      this.btn_login.addEventListener('click', () => {
        this.box_choice.style.display = 'none';
        this.box_login.style.display = 'block';
      })

  }

  saveJWT(token){
    window.localStorage.setItem('usr_token', token)
  }

  async getHtml() {
    return `  
    <div class="container">

        <section class="row">
        <div class="panel col-12 col panel-default" id="user-bottom">
            <div class="panel-heading">
            <h3 class="panel-title">Register / Login</h3>
            </div>
            <div class="panel-body">
            <form class="form-horizontal" id="register-form" name="register-form"  style="display: none">
                <div class="row">
                <div class="col col-md-6">
                    <div class="form-group">
                    <label for="inputEmail" class="col-sm-2 control-label">Email</label>
                    <div class="col-sm-10">
                        <input type="text" name="email" class="form-control" id="inputEmail" placeholder="toto@toto.fr">
                    </div>
                    </div>

                    <div class="form-group">
                    <label for="inputUsername" class="col-sm-2 control-label">Username</label>
                    <div class="col-sm-10">
                        <input type="text" name="username" class="form-control" id="inputUsername" placeholder="Toto">
                    </div>
                    </div>

                    <div class="form-group">
                    <label for="inputTravelPassword" class="col-sm-2 control-label">Password</label>
                    <div class="col-sm-10">
                        <input type="number" name="password" class="form-control" id="inputTravelPassword"
                        placeholder="******">
                    </div>
                    </div>

                    <div class="form-group">
                    <label for="inputTravelPasswordCheck" class="col-sm-2 control-label">Repeat password</label>
                    <div class="col-sm-10">
                        <input type="number" name="password-repeat" class="form-control" id="inputTravelPasswordCheck"
                        placeholder="******">
                    </div>
                    </div>

                    <button type="submit">Register</button>
                </div>
            </form>

            
            
            </div>
            <div class="panel-body">
            <form class="form-horizontal" id="loginform" name="loginform" style="display: none">
                <div class="row">
                <div class="col col-md-6">
                    <div class="form-group">
                    <label for="inputEmail" class="col-sm-2 control-label">Email</label>
                    <div class="col-sm-10">
                        <input type="text" name="email" class="form-control" id="inputEmail" placeholder="toto@toto.fr">
                    </div>
                    </div>

                    <div class="form-group">
                    <label for="inputUsername" class="col-sm-2 control-label">Username</label>
                    <div class="col-sm-10">
                        <input type="text" name="username" class="form-control" id="inputUsername" placeholder="Toto">
                    </div>
                    </div>

                    <div class="form-group">
                    <label for="inputTravelPassword" class="col-sm-2 control-label">Password</label>
                    <div class="col-sm-10">
                        <input type="number" name="password" class="form-control" id="inputTravelPassword"
                        placeholder="******">
                    </div>
                    </div>


                    <button type="submit">Login</button>
                </div>
            </form>
            </div>
        </div>
        <span id="choice">
            <p>New here ?</p>
            <button id="register-choice">Register</button>
            <button id="login-choice">Login</button>
        </span>
        </section>
    </div>`;
  }
}
