<template>
  <div class="container">
    <div class="card bg-light">
        <article class="card-body mx-auto" style="max-width: 400px;">
            <h4 class="card-title mt-3 text-center">You are not signed up to any groups</h4>
        </article>
    </div>
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
        var poolData = {  
            UserPoolId: process.env.UserPoolId,
            ClientId: process.env.ClientId   
        }

        var userPool = new cognito.CognitoUserPool(poolData);                                 
        var cognitoUser = userPool.getCurrentUser();                      

        if(!cognitoUser){
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