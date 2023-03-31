<template>
    <div id="all-products">
        <h1>All Products</h1>

        <p><router-link :to="{ name: 'create_product' }" class="btn btn-primary">Create Product</router-link></p>

        <div class="form-group">
            <input type="text" name="search" v-model="productSearch" placeholder="Search products" class="form-control" v-on:keyup="searchProducts">
        </div>
        <!--grid -->
        <div class="container">
            <div class="row">
                    <div v-for="product in products" class="position-relative container col-xs-12 col-md-4 col-lg-3 rounded position-relative">
                            <p class="position-absolute col-xs-8 col-lg-4 top-50 start-50">{{ product.name }}</p>
                            <p class="position-absolute col-xs-4 col-lg-10 top-50 start-50">{{ product.price }}</p>
                            <button class="position-absolute col-lg-2 top-50 start-50"> buy me</button>
                </div>
            </div>
        </div>
        <!--fi grid-->
        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Price</td>
                <td>Actions</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="product in products">
                    <td>{{ product.id }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                    <td>
                        <router-link :to="{name: 'edit_product', params: { id: product.id }}" class="btn btn-primary">Edit</router-link>
                        <router-link :to="{name: 'delete_product', params: { id: product.id }}" class="btn btn-danger">Delete</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default{
        data(){
            return{
                products: [],
                originalProducts: [],
                productSearch: ''
            }
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
