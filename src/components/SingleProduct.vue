<template>
    <div class="card"> 
       <div class="card-body">
           <img v-bind:src="'../../src/img/' + product.image_url" width="100" height="100"/>
           <h5 class="card-title">{{product.name}}</h5> 
           <p class="card-text">Price: <b>${{product.original_price}}</b></p> 
           <p class="card-text text-discount">Discount Price: <b>{{ isDiscount ? "$" + product.discounted_price : "" }}</b></p> 
           <button 
               class="btn mt-3"
               :class="inCartQuantity ? 'btn-success' :  'btn-danger'"
               @click="addToCart(product.id)"
               :disabled="!inCartQuantity">
               {{inCartQuantity ? "Add to Cart" : "Out of stock"}}
           </button>
       </div> 
   </div>
</template>

<script>
    export default{
        props: ["product"],
        computed: {
            inCartQuantity() {
                return this.product.stock_count;
            },
            isDiscount() {
                return this.product.is_on_discount;
            }
        },
        methods: {
            addToCart(id){
                this.$store.dispatch("addToCart", id);
            }
        }
    }
</script>
<style scoped>
    .card {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        width: 90%;
        margin: 0px 0px 50px 0px;
    }
    @media only screen and (max-width: 1190px)  {
        .card-title {
            height: 47px;
        }
        .card-body {
            height: 357px;
        }
    }
</style>