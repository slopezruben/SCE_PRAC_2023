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
                    <paypal v-if="totalItems > 0" :amount="amount"></paypal>
                    <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close + {{totalPrice}}</button>
                </div>
            </div>
        </div>
    </div>
    <!--end modal-->
</div>
</template>

<script>
import axios from 'axios'
import Paypal from './Paypal.vue'
export default{
    data(){
        return {
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
        totalPrice: function(){
            const listaTransformada = this.cartList.map(objeto => {
              return {
                id: objeto.id,
                qty: objeto.qty
              };
            });
            var total = 0
            // Realizar la solicitud al servidor
            axios.post('http://localhost:3000/api/order/create', { lista: listaTransformada })
              .then(response => {
                // Obtener la suma de los precios de la respuesta
                total = response.data.total;
                console.log('Total:', "  + ", response.data.total);
                return total
                })
              .catch(error => {
                console.error(error);
              });
            return total
        }
    },
    components: {'paypal': Paypal}
}
</script>
