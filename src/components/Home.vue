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
        console.log("Session data is: "+document.cookie);
        
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