<template>
    <div class="container">
        <h1 class="my-2">Cart <span class="badge badge-secondary">{{ cartSize }} products</span></h1>
        <div v-if="!cartSize" class="alert alert-secondary my-5" role="alert">
            Cart is empty! Please add some products.
        </div>
        <table v-else class="table table-striped mb-5">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Discount Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Note</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in cart" :key="product.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ product.name }}</td>
                    <td>$ {{ product.original_price }}</td>
                    <td>{{product.discounted_price ?  '$' + product.discounted_price : ''  }}</td>
                    <td>
                        <button @click="removeFromCart(product.id)" :disabled="product.quantity === 1"
                            class="btn btn-outline-danger btn-small">
                            -
                        </button>
                        <span class="mx-2">{{ product.quantity }}</span>
                        <button @click="addToCart(product.id)" :disabled="product.quantity === product.stock_count"
                            class="btn btn-outline-success btn-small">
                            +
                        </button>
                    </td>
                    <td>
                        <textarea v-model="product.message" placeholder="Please put your note h" style="width: 300px;"></textarea>
                    </td>
                    <td><button @click="deleteFromCart(product.id)" class="btn btn-danger btn-small">
                            Delete
                        </button></td>
                    <td>$ {{ product.is_on_discount ? product.discounted_price * product.quantity : product.original_price *
                        product.quantity }}</td>
                </tr>

                <tr class="table-footer">
                    <td><button @click="layer.show1 = true" class="btn btn-primary btn-small btn-check-out"
                            style="display: block;">Check out</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <popup-layer :visible.sync="layer.show1" @onOpen="open" @onClose="close">
            <h1>Total</h1>
            <table class="table table-striped mb-5">
                <thead class="thead-dark row-table-total">
                    <tr>
                        <th scope="col" style="text-align: center;">#</th>
                        <th scope="col" style="text-align: center;">Product</th>
                        <th scope="col" style="text-align: center;">Price</th>
                        <th scope="col" style="text-align: center;">Quantity</th>
                        <th scope="col" style="text-align: center;">Note</th>
                        <th scope="col" style="text-align: center;">Total</th>
                    </tr>
                </thead>
                <tbody class="row-table-total">
                    <tr v-for="(product, index) in cart" :key="product.id">
                        <td style="text-align: center;">
                        <th scope="row">{{ index + 1 }}</th>
                        </td>
                        <td style="text-align: center;">{{ product.name }}</td>
                        <td style="text-align: center;">$ {{ product.original_price }}</td>
                        <td style="text-align: center;">{{ product.quantity }}</td>
                        <td style="text-align: center;">{{ product.message }}</td>
                        <td style="text-align: center;">$ {{ product.is_on_discount ? product.discounted_price * product.quantity :
                            product.original_price *
                            product.quantity }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="total-footer">
                <span colspan="5" class="total"><b>Total:<span></span></b></span>
                <span>${{ cartTotalAmount }}</span>
                <span><button @click="layer.show1 = false" class="btn btn-warning btn-small">
                        Back
                    </button>
                    <button @click="handleClick()" class="btn btn-primary btn-small">Pay</button>
                </span>
            </div>
            <vue-confirm-dialog></vue-confirm-dialog>
        </popup-layer>
        <popup-layer :visible.sync="layer.show2">
            <section class="login-main-wrapper">
                <div class="main-container">
                    <div class="login-process">
                        <div class="login-main-container">
                            <div class="thankyou-wrapper">
                                <h1><img src="http://montco.happeningmag.com/wp-content/uploads/2014/11/thankyou.png"
                                        alt="thanks" /></h1>
                                <p>We have a gift for your next purchases in our store.<br>Download this pdf with a free gift voucher and a coupon code with 10% discount.</p><a href="#">Download Gift Voucher Now!</a>
                                <button @click="closePage()" class="btn btn-primary btn-small btn-back-to-home">Back to home</button>
                                <div class="clr"></div>
                            </div>
                            <div class="clr"></div>
                        </div>
                    </div>
                    <div class="clr"></div>
                </div>
            </section>
        </popup-layer>
    </div>
</template>
 
<script>
import Sumary from './Sumary.vue';
import { router } from 'vue-router';
import { mapState, mapGetters } from 'vuex'
export default {
    components: { Sumary },
    data() {
        return {
            layer: {
                show1: false,
                show2: false,
            }
        };
    },
    computed: {
        ...mapState([
            "cart"
        ]),
        ...mapGetters([
            "cartSize",
            "cartTotalAmount"
        ]),
    },
    methods: {
        addToCart(id) {
            this.$store.dispatch("addToCart", id);
        },
        removeFromCart(id) {
            this.$store.dispatch("removeFromCart", id);
        },
        deleteFromCart(id) {
            this.$store.dispatch("deleteFromCart", id);
        },
        open() {
            console.log('The first bomb layer opened')
        },
        /**
         * @param {Boolean} isPopstate：Whether the close shell event comes from the physical return key
         */
        close({ isPopstate }) {
            console.log(
                isPopstate ?
                    'Click the physical return button to close the first layer of bullets.' :
                    'Use other non-physical return key methods to close the first layer of bullets.')
        },
        closePage() {
            this.$store.state.cart = [];
            this.$router.back();
            this.$router.back();
        },
        handleClick() {
            this.$confirm(
                {
                    message: 'Are you sure want to pay?',
                    button: {
                        no: 'No',
                        yes: 'Yes'
                    },
                    /**
                    * Callback Function
                    * @param {Boolean} confirm
                    */
                    callback: confirm => {
                        if (confirm) {
                            this.layer.show2 = true;
                        }
                    }
                }
            )
        }

    },
} 
</script> 

<style scoped>
.table-footer {
    font-size: 1.2em;
    font-weight: bold;
}
.btn-back-to-home {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
    margin: 10px auto;
}
.total-footer {
    justify-content: right;
    display: flex;
    align-items: center;
    margin-right: 30px;
}

.total-footer button {
    margin-left: 30px;
    width: 100px;
    font-weight: 600;
}

.total-footer span {
    margin-right: 5px;
}

.btn-check-out {
    position: absolute;
    right: 13.5%;
}

.row-table-total tr,
.row-table-total th {
    width: calc(100%/6);
}

.thankyou-wrapper {
    width: 100%;
    height: auto;
    margin: auto;
    background: #ffffff;
    padding: 10px 0px 50px;
}

.thankyou-wrapper h1 {
    font: 100px Arial, Helvetica, sans-serif;
    text-align: center;
    color: #333333;
    padding: 0px 10px 10px;
}

.thankyou-wrapper p {
    font-size: 20px;
    width: 50%;
    margin: 0px auto;
    text-align: center;
    text-transform: uppercase;
    font-weight: 500;
    font-family: monospace;
}

.thankyou-wrapper a {
    text-align: center;
    color: #000;
    display: block;
    text-decoration: none;
    padding: 15px 20px 15px;
    font-family: cursive;
}

.thankyou-wrapper a:hover {
    color: rgb(237, 168, 39);
}

.total {
    text-align: right;
}
@media only screen and (max-width: 1190px) {
    .table td, .table th {
        font-size: 12px;
    }
    textarea {
        width: auto !important;
    } 
    .btn-check-out {
        position: absolute;
        right: 2%;
    }
    .vc-overlay {
		top: -33% !important;
	}
    .btn-back-to-home {
        width: auto;
    }
    img {
        width: 100%;
    }
}
@media only screen and (max-width: 768px) {
    .table td, .table th {
        font-size: 11px;
    }
    
}
@media only screen and (max-width: 480px) {
    table {
        overflow-y: hidden;
        overflow-x: scroll;
        width: auto;
        display: block;
    }
    .total-footer button {
        margin-bottom: 0px;
    }
    .total-footer {
        margin-right: 10px;
        margin-left: 0px;
    }
    .vc-overlay{
        top: 0% !important;
    }
    img {
        margin-top: 40px;
    }
}
@media only screen and (min-width: 375px) and (max-width:389px) {
    .total-footer button {
        margin-bottom: 0px;
    }
    .total-footer {
        margin-right: 8px !important;
        margin-left: 0px !important;
    }
    .total-footer span[data-v-530ad160] {
        margin-right: 3px;
        display: inherit;
    }
}
@media only screen and (min-width: 360px) and (max-width:374px) {
    .total-footer button {
        margin-bottom: 0px;
    }
    .total-footer span[data-v-530ad160] {
        margin-right: 3px;
        display: inherit;
    }
    .total-footer {
        margin-right: 0px !important;
        margin-left: 10px !important;
    }
}
@media only screen and (max-width:280px) {
    .total-footer button {
        margin-bottom: 10px;
    }
    .total-footer {
        margin-right: 0px !important;
        margin-left: 10px !important;
    }
}
</style>