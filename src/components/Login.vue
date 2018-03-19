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
                    document.getElementById('userMenu').innerHTML = cognitoUser.getUsername();
                    document.getElementById('userMenu').hidden = false;
                    document.getElementById('login').hidden = true;
                    cognitoUser.getUserAttributes(function(err, result) {                        
                        for (var i = 0; i < result.length; i++) {
                            console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
                        }
                    });                    
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