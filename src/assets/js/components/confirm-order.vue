<template>
	<h1>HELLO WORLD</h1>
</template>
<script>
    export default{
        data() {
            return {
            	products: []
	    }
        },

        created: function() {
        },

        methods: {
            fetchProductData: function() {
		//this 'http://localhost:3000/api/product/edit/' + this.$route.params.id
                this.$http.get('http://localhost:3000/api/products').then((response) => {
                    this.products = response.body;
                }, (response) => {

                });
            },
    	}
}

</script>

