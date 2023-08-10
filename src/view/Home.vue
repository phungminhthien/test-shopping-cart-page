<template>
    <div class="page">
        <navbar></navbar>
  		    <products></products>
  		    
  		    <cart></cart>
  		    
  		    <toast :show="toast.show" :text="toast.text" @hide-toast="hideToast"></toast>
    </div>
</template>
<script>
    import Navbar from '../components/Navbar.vue'
    import Products from '../components/Products.vue'
    import Cart from '../components/Cart.vue'
    import Toast from '../components/Toast.vue'
    
  	  export default {
  		     data(){
  			        return{
  			
  			        };
  		      },
  		      components:{
  			        Navbar,
  			        Products,
  			        Cart,
  			        Toast
  		      },
  		      computed: {
  		          toast() {
  		              return this.$store.getters.toast;
  		          }
  		      },
  		      methods: {
  		          hideToast() {
  		              this.$store.commit("hideToast");
  		          }
  		      }
 	    }   
</script>
<style scoped>
	@media only screen and (max-width: 1190px)  {
	.page {
		height: 1990px !important;
	}
	.container {
		max-width: 100% !important;
	}
}
@media only screen and (max-width: 480px)  {
	.page {
		height:3500px !important;
	}
}
</style>