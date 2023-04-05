<template>
<div id="app" class="container">
    <div class="text-right">
        <button class="btn btn-primary" data-toggle="modal" data-target="#cartModal">Cart ({{ totalItems }})</button>
    </div>

    <!--modal-->

    <aside class="modal fade" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">Cart</h4>
                <div class="modal-body">
                    <shopping-cart inline-template :items="this.cartList">
                        <div>
                            <table class="table table-cart">
                                <tr v-for="(item, index) in items">
                                    <td>{{item.title}}</td>
                                    <td class="text-right"> ${{ item.price }} </td>
                                </tr>
                            </table>
                        </div>
                    </shopping-cart>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </aside>
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
            return this.cartList.length;
        }
    }
}
</script>