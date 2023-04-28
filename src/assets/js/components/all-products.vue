<template>
    <div id="all-products">
        <navigationBar @searchedProducts="searchProducts($event)" :cartList="this.cartList"></navigationBar>
        <h1>All Products</h1>
        <p><router-link :to="{ name: 'create_product' }" class="btn btn-primary">Create Product</router-link></p>
        <div class="container">
            <div class="row">
                    <div v-for="product in products" :key="product.id" class="col-sm-6 col-lg-4 col-xs-12 text-center mb-3 mt-2">
                        <ProductCoin @addProductToCart="sendToCart($event)" :id="product.id" ></ProductCoin>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ProductCoin from './product-coin.vue';
    import navigationBar from './navigation-bar.vue';
    export default{
        data() {
            return{
                products: [],
                originalProducts: [],
                productSearch: '',
                cartList: []
            }
        },
        components: {
            ProductCoin,
            navigationBar,
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

            searchProducts: function(productSearch)
            {
                if(productSearch == '')
                {
                    this.products = this.originalProducts;
                    return;
                }
                //Va igual de rapido y no reregenera casillas
                //this.products= this.products.filter((product) => product.name.toLowerCase().includes(this.productSearch.toLowerCase()));
            
                            
                var searchedProducts = [];
                for(var i = 0; i < this.originalProducts.length; i++)
                {
                    var productName = this.originalProducts[i]['name'].toLowerCase();
                    if(productName.indexOf(productSearch.toLowerCase()) >= 0)
                    {
                        searchedProducts.push(this.originalProducts[i]);
                    }
                }
                this.products = searchedProducts;
            
            },
            sendToCart: function(product)
            {

                let itemInCart = this.cartList.filter(productInCart => productInCart.id===product.id);
    			let isItemInCart = itemInCart.length > 0;
                
                if (isItemInCart === false) {
                    product['qty'] = 1
                    this.cartList.push(product);
                } else {
                    console.log("AAAAAAAAAAAAAA")
	    			itemInCart[0].qty = 10;
			    }
                
                //console.log(product.name)
            }
        },
    }
</script>
