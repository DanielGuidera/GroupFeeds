<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <button v-on:click="checkForCredentials"> Create Account  </button>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        msg: 'Welcome to the home page'
      }
    },
    methods: {          
      checkForCredentials: function () {   
        var cognito = require('amazon-cognito-identity-js');  
        var userPool = new cognito.CognitoUserPool(window._config.cognito);

        var userData = {
          Username : localStorage.userName,
          Pool : userPool
        };

        var cognitoUser = new cognito.CognitoUser(userData);         
        
        // if(result == null){
        //   this.$router.push({name: 'Newuser'})
        // }                                       
      }
      
    },
     mounted: function () {          
        this.checkForCredentials(); 

            // this.getAttributes();
       }
  }
</script>