<template>
    <div id="profile">
        <h1>{{ msg }}</h1>
        Username: <label id="p_username"></label>
        <br/>
        Email: <label id="p_email"></label>        
        
    </div>
</template>

<script>
    export default {
        name: 'Nav',
        data () {        
            return {
                msg: 'Profile'
            }
        },
        methods: {
            getAttributes: function () {    
                // var result = localStorage["CognitoIdentityServiceProvider.4i5u4ot6enb7em4m66pcp4gbud.Daniel1.idToken"];     
                // console.log(result)       ;
                // var cognito = require('amazon-cognito-identity-js');
                // var poolData = {
                //     UserPoolId : window._config.cognito.userPoolId,
                //     ClientId: window._config.cognito.userPoolClientId
                // };
                
                // var userPool = new cognito.CognitoUserPool(poolData);
                // var cognitoUser = userPool.getCurrentUser();            
                
                // document.getElementById("p_username").innerHTML = localStorage.getItem("username");
                // // document.getElementById("p_email").innerHTML = attr["email"];

                // cognitoUser.getUserAttributes(function(err, result){
                //     if(err){
                //         alert(err);
                //         return;
                //     }
                //     console.log(result);
                // });
                }
        },
        mounted: function () {            
            this.getAttributes();
        }
    }
</script>
