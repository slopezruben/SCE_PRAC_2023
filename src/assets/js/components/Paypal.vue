<template>
<div>
<div id="paypal-button-container"></div>
<div v-if="success" class="alert alert-success">
  <strong>Success!</strong> Payment successfuly done
</div>
<div v-if="error" class="alert alert-danger">
  <strong>Ooops!</strong>  Something went wrong!
</div>
</div>
</template>
<script>
import axios from 'axios'


export default {
    name:'paypal',
    props:['amount'],
    data (){
        return {
            error:false ,
            success:false
        }
    },
    methods:{
        sendDataPaypal (creds) { //promise -> post contra el server
            return new Promise((resolve, reject) => { //axios es per enviar crides al server
              axios.post('http://localhost:3000/checkout', creds).then(res => { //aqui enviarem els credencials i el amount
                  return resolve()
              }).catch((err) => {
                  return reject(err)
              })
            })
        }
    },
    mounted(){
           let  client = {
                  sandbox: 'AV8MPmd1b80NBdLxK32A86bO1vY-GxKk8Nqzgi0CYPeTuJ8SI3FCzks53EfX2hDvWOg0K4gMqLvD80GV',
           }
           let  payment = (data, actions) => {
                // Make a call to the REST api to create the payment
                return actions.payment.create({
                    payment: {
                        transactions: [
                            {
                                amount: { total:this.amount, currency: 'USD' }
                            }
                        ]
                    }
                });
            }
            let  onAuthorize = (data) => {
                var data = {
                    paymentID: data.paymentID,
                    payerID: data.payerID,
                    amount:this.amount
                };
                this.sendDataPaypal({data:data}).then(() => {
                    this.success=true
                }).catch(err=>{
                    this.error=true
                });
            }
            console.log(onAuthorize)
            paypal.Button.render({onAuthorize, payment, env:'sandbox'}, '#paypal-button-container');
    }
}
</script>
