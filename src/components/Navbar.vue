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
                        <a class="nav-link" href="#" v-on:click="newuserClick" id="newuser">New User</a>
                    </li>                   
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="userMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" hidden></a>
                        <div class="dropdown-menu" aria-labelledby="userMenu">
                            <a class="dropdown-item" href="#" v-on:click="profileClick">Profile</a>
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
                UserPoolId: process.env.UserPoolId,
                ClientId: process.env.ClientId   
            }
          
          var userPool = new cognito.CognitoUserPool(poolData);
          var cognitoUser = userPool.getCurrentUser();
          
          if (cognitoUser != null) {                
                localStorage.clear();
                cognitoUser.signOut();
                document.getElementById('userMenu').hidden = true;                    
                document.getElementById('newuser').hidden = false;                
            }

            this.$router.push({name: 'Newuser'});        
      },
      profileClick: function () {
          this.$router.push({name: 'Profile'});
      },
      homeClick: function () {                        
          this.$router.push({name: 'Home'});
      },
      newuserClick: function () {
          this.$router.push({name: 'Newuser'})
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
