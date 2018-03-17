<template>
    <div id="nav">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Group Feeds</a>  
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
            <a class="nav-item nav-link active" href="#" v-on:click="homeClick">Home <span class="sr-only">(current)</span></a>    
            <a class="nav-item nav-link" href="#" v-on:click="loginClick">Login</a>            
            </div>
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
      homeClick: function () {
          this.$router.push({name: 'Home'});
      }
  }
}
</script>
