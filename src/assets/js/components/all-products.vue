<template>
    <div id="all-products">
        <navigationBar @searchedProducts="searchProducts($event)" :cartList="this.cartList"></navigationBar>
        <h1>All Products</h1>
        <div class="container">
            <div class="row row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4 ">
                    <div v-for="product in products" :key="product.id" class="text-center mb-3 mt-2 ">
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
                    let index = this.cartList.indexOf(itemInCart[0]);
                    let newItem = JSON.parse(JSON.stringify(itemInCart[0]));
                    newItem.qty = 1 + itemInCart[0]['qty'];
                    this.$set(this.cartList, index, newItem);
			    }
            }
        },
    }
</script>
