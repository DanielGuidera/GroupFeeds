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
                            <a class="dropdown-item" href="#">Log Out</a>                            
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
        <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <ul class="navbar-nav mr-auto">
            <a class="navbar-brand" href="#">Group Feeds</a>  
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a ref="homeButton" class="nav-item nav-link active" href="#" v-on:click="homeClick">Home <span class="sr-only">(current)</span></a>    
                    <a class="nav-item nav-link" href="#" v-on:click="loginClick" id="loginButton">Login</a>
                    <a class="nav-item nav-link" href="#" v-on:click="homeClick" id="userButton" hidden></a>                        
                    <div class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="userButton" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" hidden></a>
                        <div class="dropdown-menu" aria-labelledby="userButton">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                </div>
            </div> 
        </nav> -->        
    </div>     
</template>

<script>
export default {
  name: 'Nav',  
  methods: {
      loginClick: function () {                  
          this.$router.push({name: 'Login'});
      },
      homeClick: function () {          
          this.$router.push({name: 'Home'});
      }
  }
}
</script>
