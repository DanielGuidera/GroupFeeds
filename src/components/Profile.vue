<template>
   <div class="container">
    <div class="card bg-light">
        <article class="card-body mx-auto" style="max-width: 400px;">
            <h4 class="card-title mt-3 text-center">Profile</h4>            
            <form>
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                    </div>
                    <input id="p_username" class="form-control" placeholder="User name" type="text" readonly>
                </div> <!-- form-group// -->    
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                    </div>
                    <input id="p_email" class="form-control" placeholder="Email address" type="email" readonly>
                </div> <!-- form-group// -->                        
            </form>
        </article>
    </div> <!-- card.// -->
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
                var cognito = require('amazon-cognito-identity-js');
                var poolData = {  
                    UserPoolId: process.env.UserPoolId,
                    ClientId: process.env.ClientId   
                }
                
                var userPool = new cognito.CognitoUserPool(poolData);                                 
                var cognitoUser = userPool.getCurrentUser();                                       
                cognitoUser.getSession(function(err, session){
                    if(err){
                        alert(err.message || JSON.stringify(err));
                        return;
                    }
                    
                    var jwt = require('jsonwebtoken');
                    var decoded = jwt.decode(session.idToken.jwtToken);
                    console.log(decoded.email);
                    document.getElementById("p_email").value = decoded.email;                    
                    document.getElementById("p_username").value = decoded["cognito:username"];
                    
                });                                                                            
            }
        },
        mounted: function () {            
            this.getAttributes();
        }
    }
</script>
