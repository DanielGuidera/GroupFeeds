<template>
    <div id="nav">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="#" v-on:click="homeClick">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" v-on:click="loginClick" id="login">Login</a>
                    </li>                   
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="userMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" hidden></a>
                        <div class="dropdown-menu" aria-labelledby="userMenu">
                            <a class="dropdown-item" href="#">Profile</a>
                            <a class="dropdown-item" href="#" v-on:click="logoutClick">Log Out</a>                            
                        </div>
                    </li>
                </ul>
            </div>
        </nav>              
    </div>     
</template>

<script>
export default {
  name: 'Nav',  
  methods: {
      loginClick: function () {                  
          this.$router.push({name: 'Login'});
      },
      logoutClick: function () {
          var cognito = require('amazon-cognito-identity-js');
          var poolData = {
              UserPoolId : window._config.cognito.userPoolId,
              ClientId: window._config.cognito.userPoolClientId
          };
          
          var userPool = new cognito.CognitoUserPool(poolData);
          var cognitoUser = userPool.getCurrentUser();
          
          if (cognitoUser != null) {
                cognitoUser.getSession(function(err, session) {
                    if (err) {
                        alert(err);
                        return;
                    }
                    localStorage.clear();
                    cognitoUser.signOut();  
                    document.getElementById('userMenu').hidden = true;
                    document.getElementById('login').hidden = false;          
                });
            }
            this.$router.push({name: 'Home'});        
      },
      homeClick: function () {                        
          this.$router.push({name: 'Home'});
      }
  },
  mounted: function () {      
      if(localStorage.getItem("username") != null){
          document.getElementById('userMenu').hidden = false;
          document.getElementById('login').hidden = true;
          document.getElementById('userMenu').innerHTML = localStorage.getItem("username");
      }
      
  }
}
</script>
