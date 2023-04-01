<template>
    <div class="card pb-xs-3" style="width: 18rem;">
        <img src="src/assets/img/bitcoin.png" class="card-img-top img-thumbnail" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ this.name }}</h5>
            <div class="card-text">{{ this.price }}</div>
            <a href="#" class="btn btn-primary">Buy Me</a>
            <router-link :to="{name: 'edit_product', params: { id: this.id }}" class="btn btn-primary">Edit</router-link>
            <router-link :to="{name: 'delete_product', params: { id: this.id }}" class="btn btn-danger">Delete</router-link> </div>
    </div>
</template>

<script>
export default{
        props: {
            id: Number 
        },
        data(){
            return{
                product: {},
               
            }
        },

        watch: {
          product: function(){
            this.fetchProductData();
          }  
        },

        computed: {
            name: function() {
                return this.product.name
            },
            price: function(){
                return this.product.price
            }
        },

        created: function()
        {
            this.fetchProductData();
        },

        methods: {
            fetchProductData: function()
            {
                this.$http.get('http://localhost:3000/api/product/'+this.id).then((response) => {
                    this.product = response.body;
                }, (response) => {

                });

            }
               }
        }

</script>
