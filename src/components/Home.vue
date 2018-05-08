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
        try{
          // debugger;
          var poolData = {  
            UserPoolId: 'eu-west-1_Kh2zLTkDO',
            ClientId: '4i5u4ot6enb7em4m66pcp4gbud',      
          }
          var cognito = require('amazon-cognito-identity-js');            
          var userPool = new cognito.CognitoUserPool(poolData);          

          var userData = {
            Username : localStorage.userName,
            Pool : userPool
          };

          var cognitoUser = new cognito.CognitoUser(userData);    
        } 
        catch(err){
          console.log(err);
           this.$router.push({name: 'Newuser'})
        }                                                                  
      }
      
    },
     mounted: function () {          
        this.checkForCredentials(); 

            // this.getAttributes();
       }
  }
</script>