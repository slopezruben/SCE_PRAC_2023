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
                                <tr v-for="(item, index) in this.cartList">
                                    <td>{{ item.name }}</td>
                                    <td class="text-right"> ${{ item.price }} | {{ item.qty }}</td>
                                    
                                </tr>
                            </table>
                        </div>
                </div>
                <div class="modal-footer">
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
    props:{
        cartList: []
    },
    computed: {
        totalItems: function(){
            let total = 0
            for(const item in this.cartList){
                console.log(item.name)
                total += item.qty
            }
            return total
        }
    }
}
</script>