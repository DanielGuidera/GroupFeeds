<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <button > Create Account  </button>
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
        var result = localStorage;
        console.log(result);
        if(result == null){
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