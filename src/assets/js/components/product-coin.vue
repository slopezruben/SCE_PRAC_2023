<template>
    <div class="card border-dark pb-xs-3" style="width: 18rem;">
        <img :src="this.imagesource" class="card-img-top img-thumbnail" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ this.name }}</h5>
            <div class="card-text">{{ this.price }}</div>
            <button class="btn btn-primary" @click="addToCart()">Buy Me</button></div>
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
        computed: {
            name: function() {
                return this.product.name
            },
            price: function(){
                return this.product.price
            },
            imagesource: function(){
                return this.product.imgsrc
            }
        },

        created: function()
        {
            this.fetchProductData();
	        setInterval(this.updateCoin, 10000)
        },

        methods: {
            fetchProductData: function()
            {
                this.$http.get('http://localhost:3000/api/product/'+this.id).then((response) => {
                    this.product = response.body;
                }, (response) => {

                });

            },
            addToCart: function(){
                this.$emit('addProductToCart', this.product)
            },
	    updateCoin: function(){
	    	this.$http.put('http://localhost:3000/api/product/'+this.id).then((response) => {
			this.product.price = response.body;
		}, (response) => {
		
		});
	    }
        }
    }

</script>
