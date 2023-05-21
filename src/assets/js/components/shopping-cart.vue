<template>
<div id="app" class="container">
    <div class="text-right">
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cartModal">Cart ({{ totalItems }})</button>
    </div>

    <!--modal-->

    <div class="modal fade" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <h4 class="modal-title" id="myModalLabel">Cart</h4>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="modal-body">
                        <div>
                            <table class="table table-cart">
                                <tr v-for="item in this.cartList" :key="item.id">
                                    <td>{{ item.name }}</td>
                                    <td class="text-right"> {{ item.qty }}</td>
                                    
                                </tr>
                            </table>
                        </div>
                </div>
                <div class="modal-footer">
                    <paypal v-if="totalItems > 0" :amount="total"></paypal>
                    <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close {{ totalPrice }}</button>
                </div>
            </div>
        </div>
    </div>
    <!--end modal-->
</div>
</template>

<script>
import axios, { formToJSON } from 'axios'
import Paypal from './Paypal.vue'
export default{
    data(){
        return {
            total: 0
        }
    },

    props:{
        cartList: [],
    },
    computed: {
        totalItems: function(){
            var total = 0
            for(let item in this.cartList){
                let product = JSON.parse(JSON.stringify(this.cartList[item]))                
                if(!isNaN(product.qty)){
                    total += product.qty
                }
            }
            
            return total
        },
        totalPrice: function() {
            this.responseValue()
            return this.total
        }
    },
    components: {'paypal': Paypal},
    methods: {
          async responseValue(){
            const listaTransformada = this.cartList.map(objeto => {
              return {
                id: objeto.id,
                qty: objeto.qty
              };
            });
            try {
                const response = await axios.post('http://localhost:3000/api/order/create', { lista: listaTransformada })
                this.total = response.data.total
            } catch (error) {
                console.error(error)
            }
            }
    }
}
</script>
