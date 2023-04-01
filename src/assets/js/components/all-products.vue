<template>
    <div id="all-products">
        <h1>All Products</h1>

        <p><router-link :to="{ name: 'create_product' }" class="btn btn-primary">Create Product</router-link></p>

        <div class="form-group">
            <input type="text" name="search" v-model="productSearch" placeholder="Search products" class="form-control" v-on:keyup="searchProducts">
        </div>
        <div class="container">
            <div class="row">
                    <div v-for="product_id in products" class="col-sm-6 col-lg-4 col-xs-12 text-center">
                        <ProductCoin :id= product_id.id ></ProductCoin>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ProductCoin from './product-coin.vue';
    export default{
        data(){
            return{
                products: [],
                originalProducts: [],
                productSearch: ''
            }
        },
        components: {
            ProductCoin    
        },
        created: function()
        {
            this.fetchProductData();
        },

        methods: {
            fetchProductData: function()
            {
                this.$http.get('http://localhost:3000/api/products').then((response) => {
                    this.products = response.body;
                    this.originalProducts = this.products;
                }, (response) => {

                });
            },

            searchProducts: function()
            {
                if(this.productSearch == '')
                {
                    this.products = this.originalProducts;
                    return;
                }

                var searchedProducts = [];
                for(var i = 0; i < this.originalProducts.length; i++)
                {
                    var productName = this.originalProducts[i]['name'].toLowerCase();
                    if(productName.indexOf(this.productSearch.toLowerCase()) >= 0)
                    {
                        searchedProducts.push(this.originalProducts[i]);
                    }
                }

                this.products = searchedProducts;
            }
        }
    }
</script>
