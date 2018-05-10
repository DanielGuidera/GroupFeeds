<template>
<div class="container">
    <div class="card bg-light">
        <article class="card-body mx-auto" style="max-width: 400px;">
            <h4 class="card-title mt-3 text-center">Create Account</h4>
            <p class="text-center">Get started with your free account</p>		
            <form>
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                    </div>
                    <input ref="n_username" class="form-control" placeholder="User name" type="text">
                </div> <!-- form-group// -->    
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                    </div>
                    <input ref="n_email" class="form-control" placeholder="Email address" type="email">
                </div> <!-- form-group// -->        
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                    </div>
                    <input id="n_password" ref="n_password" class="form-control" placeholder="Create password" type="password" v-on:keyup="validatePassword" data-html="true" data-toggle="popover" data-trigger="focus" title="Password must contain" data-content="
                        <div>
                            <ul>
                                <li id='letter' class='invalid'>At least <strong>one letter</strong></li>
                                <li id='capital' class='invalid'>At least <strong>one capital letter</strong></li>
                                <li id='number' class='invalid'>At least <strong>one number</strong></li>
                                <li id='length' class='invalid'>Be at least <strong>8 characters</strong></li>
                                <li id='space' class='invalid'>use at least<strong> one special character</strong></li>
                            </ul>
                        </div>"
                     @focus="passwordFocus">
                </div> <!-- form-group// -->
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                    </div>
                    <input ref="n_confirmpassword" class="form-control" placeholder="Repeat password" type="password">
                </div> <!-- form-group// -->                                      
                <div class="form-group">
                    <button type="button" class="btn btn-primary btn-block" v-on:click="createClick"> Create Account  </button>
                </div> <!-- form-group// -->      
                <p class="text-center">Have an account? <a href="#loginModal" data-toggle="modal">Log In</a> </p>                                                                 
            </form>            
        </article>
    </div> <!-- card.// -->

    <!-- Modal HTML -->
<div id="loginModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">                
                <h4 class="modal-title">Login</h4>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                        </div>
                        <input ref="l_username" class="form-control" placeholder="User name" type="text">
                    </div> <!-- form-group// -->
                    <div class="form-group input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                        </div>
                        <input ref="l_password" class="form-control" placeholder="Password" type="password">
                    </div> <!-- form-group// -->
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" v-on:click="login">Login</button>
            </div>
        </div>
    </div>
</div>
</div> 
</template>
<script>
export default {
  methods: {      
      createClick: function () {
          var username = this.$refs.n_username.value;
          var email = this.$refs.n_email.value;
          var psw = this.$refs.n_password.value;
          var confirmed_psw = this.$refs.n_confirmpassword.value;
          debugger;

          if(psw == confirmed_psw){             

            var cognito = require('amazon-cognito-identity-js');
            var userPool = new cognito.CognitoUserPool(window._config.cognito);

            var attributeList = [];

            var dataEmail = {
                Name : 'email',
                Value : email
            };
          
            
            var attributeEmail = new cognito.CognitoUserAttribute(dataEmail);            

            attributeList.push(attributeEmail);    

            userPool.signUp(username, psw, attributeList, null, {
                onSuccess: (result) => {
                    cognitoUser = result.user;
                    console.log('user name is ' + cognitoUser.getUsername());
                    this.$router.push({name: 'Newuser'})
                },                 
                onFailure: function(err){                     
                    if(err.message != 200){
                        alert(err.message);
                    }
                    else{
                        alert(err);
                    }
                    
                    clearFields();                                                                            
                }  

            });      

            // userPool.signUp(username, psw, attributeList, null, (err, result) => {
            //     if (err) {
            //         alert(err.message);
            //         return;
            //     }
            //     cognitoUser = result.user;
            //     console.log('user name is ' + cognitoUser.getUsername());
            //     this.$router.push({name: 'Newuser'})
            // });    
          }
          else{
              alert("Passwords do not match");
              this.$router.push({name: 'Newuser'})
          }                                    
      },
      login: function () {          
            var refs = this.$refs;
            var router = this.$router;   

            var clearFields = () => {
                refs.l_username.value = null;
                refs.l_password.value = null;
            }   

            var homePage = () => {
                clearFields();             
                router.push({name: 'Home'});
            };
            
            $("#loginModal").modal('toggle');   

            var authenticationData = {
                Username : this.$refs.l_username.value,
                Password : this.$refs.l_password.value,
            };

            var cognito = require('amazon-cognito-identity-js');
            var authenticationDetails = new cognito.AuthenticationDetails(authenticationData);
            var poolData = {  
                UserPoolId: process.env.UserPoolId,
                ClientId: process.env.ClientId   
            }

            var userPool = new cognito.CognitoUserPool(poolData);
            var userData = {
                Username : this.$refs.l_username.value,
                Pool : userPool
            };
            
            var cognitoUser = new cognito.CognitoUser(userData);            
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (result) => {                                           
                    var jwt = require('jsonwebtoken');
                    var decoded = jwt.decode(result.getIdToken().getJwtToken());                                                                                                                                                   
                    
                    //update nav bar
                    document.getElementById('userMenu').innerHTML = decoded["cognito:username"];
                    document.getElementById('userMenu').hidden = false;                    
                    document.getElementById('newuser').hidden = true;                                          
                    
                    homePage();                    
                },                 
                onFailure: function(err){                     
                    if(err.message != 200){
                        alert(err.message);
                    }
                    else{
                        alert(err);
                    }
                    
                    clearFields();                                                                            
                }                
            });            
        },
        validatePassword: function () {            
            var pswd = this.$refs.n_password.value;
            
            //validate the length
            if ( pswd.length < 8 ) {                
               var element = document.getElementById('length');
               element.className = element.className.replace(/\bvalid\b/g, "invalid");
            } else {
                var element = document.getElementById('length');
                element.className = element.className.replace(/\binvalid\b/g, "valid");
            }
            
            //validate letter
            if ( pswd.match(/[A-z]/) ) {
                var element = document.getElementById('letter');
                element.className = element.className.replace(/\binvalid\b/g, "valid");
            } else {
                var element = document.getElementById('letter');
               element.className = element.className.replace(/\bvalid\b/g, "invalid");
            }

            //validate capital letter
            if ( pswd.match(/[A-Z]/) ) {
                var element = document.getElementById('capital');
                element.className = element.className.replace(/\binvalid\b/g, "valid");
            } else {
                var element = document.getElementById('capital');
                element.className = element.className.replace(/\bvalid\b/g, "invalid");
            }

            //validate number
            if ( pswd.match(/\d/) ) {
                var element = document.getElementById('number');
                element.className = element.className.replace(/\binvalid\b/g, "valid");
            } else {
                var element = document.getElementById('number');
                element.className = element.className.replace(/\bvalid\b/g, "invalid");
            }
            
            //validate space
            if ( pswd.match(/[^a-zA-Z0-9\-\/]/) ) {
                var element = document.getElementById('space');
                element.className = element.className.replace(/\binvalid\b/g, "valid");
            } else {
                var element = document.getElementById('space');
                element.className = element.className.replace(/\bvalid\b/g, "invalid");
            }              
        },
        passwordFocus: function () {                                             
            $('#n_password').popover('show');
            this.validatePassword();   
        },
        passwordBlur: function () {
            $('#pswd_info').hide();
        },
        mounted: function () {
            $("[data-toggle=popover]").popover();
        }            
  }
}
</script>

<style>
   .divider-text {
    position: relative;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
}
.divider-text span {
    padding: 7px;
    font-size: 12px;
    position: relative;   
    z-index: 2;
}
.divider-text:after {
    content: "";
    position: absolute;
    width: 100%;
    border-bottom: 1px solid #ddd;
    top: 55%;
    left: 0;
    z-index: 1;
}

/* Base CSS */
.alignleft {
    float: left;
    margin-right: 15px;
}
.alignright {
    float: right;
    margin-left: 15px;
}
.aligncenter {
    display: block;
    margin: 0 auto 15px;
}
a:focus { outline: 0 solid }
img {
    max-width: 100%;
    height: auto;
}
.fix { overflow: hidden }
h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0 0 15px;
    font-weight: 700;
}
html,
body { height: 100% }

a {
    -moz-transition: 0.3s;
    -o-transition: 0.3s;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    color: #333;
}
a:hover { text-decoration: none }



.search-box{margin:80px auto;position:absolute;}
.caption{margin-bottom:50px;}
.loginForm input[type=text], .loginForm input[type=password]{
	margin-bottom:10px;
}
.loginForm input[type=submit]{
	background:#fb044a;
	color:#fff;
	font-weight:700;
	
}


#pswd_info {
	background: #dfdfdf none repeat scroll 0 0;
	color: #fff;
	left: 20px;
	position: absolute;
	top: 115px;
}
#pswd_info h4{
    background: black none repeat scroll 0 0;
    display: block;
    font-size: 14px;
    letter-spacing: 0;
    padding: 17px 0;
    text-align: center;
    text-transform: uppercase;
}
#pswd_info ul {
    list-style: outside none none;
}
#pswd_info ul li {
   padding: 10px 45px;
}



.valid {
	background: rgba(0, 0, 0, 0) url("https://s19.postimg.org/vq43s2wib/valid.png") no-repeat scroll 2px 6px;
	color: green;
	line-height: 21px;
	padding-left: 22px;
}

.invalid {
	background: rgba(0, 0, 0, 0) url("https://s19.postimg.org/olmaj1p8z/invalid.png") no-repeat scroll 2px 6px;
	color: red;
	line-height: 21px;
	padding-left: 22px;
}


#pswd_info::before {
    background: #dfdfdf none repeat scroll 0 0;
    content: "";
    height: 25px;
    left: -13px;
    margin-top: -12.5px;
    position: absolute;
    top: 50%;
    transform: rotate(45deg);
    width: 25px;
}
#pswd_info {
    display:none;
}

</style>

