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
                    <input ref="n_username" class="form-control" placeholder="User name" type="text" readonly>
                </div> <!-- form-group// -->    
                <div class="form-group input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                    </div>
                    <input ref="n_email" class="form-control" placeholder="Email address" type="email" readonly>
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
                    UserPoolId: 'eu-west-1_Kh2zLTkDO',
                    ClientId: '4i5u4ot6enb7em4m66pcp4gbud',      
                }
                
                var userPool = new cognito.CognitoUserPool(poolData);                                 

                var cognitoUser = userPool.getCurrentUser();   
                debugger;             
                
                cognitoUser.getUserAttributes(function(err, result) {
                    debugger;
                    if(err){
                        alert(err.message);
                    }
                    
                    for (i = 0; i < result.length; i++) {
                        console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
                    }
                });                
                
                // document.getElementById("p_username").innerHTML = localStorage.getItem("username");
                // document.getElementById("p_email").innerHTML = attr["email"];

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
