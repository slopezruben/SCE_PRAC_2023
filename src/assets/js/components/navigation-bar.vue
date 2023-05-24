<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">SCECryptos</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <a class="nav-link active" aria-current="page">Home</a>
            </li>
        </ul>

        <div class="form-group">
            <input type="text" name="search" v-model="productSearch" list="searchOptions" placeholder="Search products" class="form-control" v-on:keyup="searchProducts"/>
	    <datalist id="searchOptions">
      		<option v-for="option in options" :value="option">{{ option }}</option>
    	    </datalist>
        </div>
        <ShoppingCart :cartList="this.cartList"></ShoppingCart>
        </div>
    </div>
    </nav>
</template>

<script>
import ShoppingCart from './shopping-cart.vue';

    export default{
    props: {
        cartList: []
    },
    data: function() {
    	return {
		productSearch: "",
		options: []

	};
    },
    methods: {
        searchProducts: function () {
            	this.$emit("searchedProducts", this.productSearch);
     		if (this.productSearch.length >= 1) {
			$.ajax({
			  url: 'http://localhost:3000/api/products/search/'+this.productSearch,
			  type: 'GET',
			  dataType: 'json',
			  success: response => {
			    this.options = response;
			  },
			  error: error => {
			    console.log(error);
			  }
			});
      		} else {
        		this.options = [];
      		}
        },
    },
    components: { ShoppingCart }
}
</script>
