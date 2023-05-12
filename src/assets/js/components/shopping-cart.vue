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
                    <button type="button" v-if="totalItems > 0" class="btn btn-default" data-bs-dismiss="modal" @click="$router.push({ name: 'edit_product', params: {id: cartList.map(item => item.id).join(',')} })">
                        BUY NOW
                    </button>
                    <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!--end modal-->
</div>
</template>

<script>
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
    }
}
</script>
