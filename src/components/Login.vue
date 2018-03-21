<template>
  <div class="login">
    <h1>{{ msg }}</h1>
    <input ref="usrname" placeholder="User Name">
    <input type = "password" ref="psword" placeholder="Password">
    <button v-on:click="login">Login</button>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
        
      return {
        msg: 'Login'
      }
    },
    methods: {
        homePage: function () {
            this.$refs.usrname.value = null;
            this.$refs.psword.value = null;             
            this.$router.push({name: 'Home'});
        },
        login: function () {                                   
            var authenticationData = {
                Username : this.$refs.usrname.value,
                Password : this.$refs.psword.value,
            };
            var cognito = require('amazon-cognito-identity-js');
            var authenticationDetails = new cognito.AuthenticationDetails(authenticationData);
            var poolData = {
                UserPoolId : window._config.cognito.userPoolId,
                ClientId: window._config.cognito.userPoolClientId
            };
            var userPool = new cognito.CognitoUserPool(poolData);
            var userData = {
                Username : this.$refs.usrname.value,
                Pool : userPool
            };
            var cognitoUser = new cognito.CognitoUser(userData);            
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) { 
                    //decode the jwt
                    var jwt = require('jsonwebtoken');
                    var decoded = jwt.decode(result.getIdToken().getJwtToken())                                                        

                    //Save username and ID to local storage
                    localStorage.setItem("username", decoded["cognito:username"]);
                    localStorage.setItem("userid", decoded["aud"]);      
                    localStorage.setItem("coguser", cognitoUser);
                    
                    //update nav bar
                    document.getElementById('userMenu').innerHTML = decoded["cognito:username"];
                    document.getElementById('userMenu').hidden = false;
                    document.getElementById('login').hidden = true;
                },                 
                onFailure: function(err){
                    alert(err.result);
                }                
            });
            this.homePage();
        }
    }
  }
</script>