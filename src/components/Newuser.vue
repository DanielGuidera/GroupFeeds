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
                    <input ref="n_password" class="form-control" placeholder="Create password" type="password">
                </div> <!-- form-group// -->
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                    </div>
                    <input ref="n_confirmpassword" class="form-control" placeholder="Repeat password" type="password">
                </div> <!-- form-group// -->                                      
                <div class="form-group">
                    <button class="btn btn-primary btn-block" v-on:click="createClick"> Create Account  </button>
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

.btn-facebook {
    background-color: #405D9D;
    color: #fff;
}
.btn-twitter {
    background-color: #42AEEC;
    color: #fff;
}

</style>

