<template>
  <div id="new">
    <button v-on:click="greet">send</button>
  </div>
</template>

<script>
export default {
  name: 'New',
  methods: {
    greet: function () {
      window.location.href = 'https://groupfeeds.auth.eu-west-1.amazoncognito.com/login?redirect_uri=https://localhost:8080/&response_type=code&client_id=4i5u4ot6enb7em4m66pcp4gbud'
      // axios.get('https://975xmn371g.execute-api.eu-west-1.amazonaws.com/Dev')
      // axios.get('https://groupfeeds.auth.eu-west-1.amazoncognito.com/login?redirect_uri=https://localhost:8080/&response_type=code&client_id=4i5u4ot6enb7em4m66pcp4gbud')
      // .then(function (response) {
        // alert(response.data)
      // })
      // this.$http.get('https://975xmn371g.execute-api.eu-west-1.amazonaws.com/Dev', (data) => {
      //   alert(data);
      // })
      // $.ajax({
      //   url: 'https://975xmn371g.execute-api.eu-west-1.amazonaws.com/Dev',
      //   type: 'GET',
      //   crossDomain: true,                
      //   success: function(response){
      //     alert(response)
      //   }   
      // });
    } 
  }
}
</script>
