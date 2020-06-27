<template>
    <div id="root-top">
        <div id="empty-cart" v-if="cartEmpty">
            <div id="empty-line1">Your cart is empty!</div>
            <br>Add some items to your cart so you can checkout.
        </div>

        <div id="cart-items" v-for="product in products" :key="product.id">
            <ShoppingCartItem :name=product.name :price=product.price @clicked="deleteClick(product.id)"></ShoppingCartItem>
        </div>
        <div id="bottom-information" v-if="!cartEmpty">
            <div id="total-cost">
                <span id="total-title">Total:</span> ${{ totalCost }}
            </div>
            <div id=checkout>
                <router-link class="router-link" :to="{name: 'checkout'}">
                    <button id="checkout-button">Checkout</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root-top {
        font-family: 'Quicksand', sans-serif;
        color: #00A896;
    }

    .router-link {
        text-decoration: none;
        color: #ffffff;
    }

    #empty-cart {
        text-align: center;
        margin-top: 15%;
        font-size: 300%;
    }

    #empty-line1 {
        font-weight: bolder;
        margin: 5px;
    }

    #cart-items {
        display: flex;
        justify-content: center;
        margin-top: 1%;
    }

    #bottom-information {
        display: flex;
        flex-direction: row;
        width: 80%;
        margin: 2% auto 2%;
    }

    #total-cost {
        margin-right: auto;
        margin-top: 1%;
        font-size: 250%;
    }

    #total-title {
        font-weight: bolder;
    }

    #checkout {
        margin-left: auto;
    }

    #checkout-button {
        font-size: 200%;
        font-family: 'Quicksand', sans-serif;
        padding: 15px 25px 15px 25px;
        align-self: start;
        background-color: #00A896;
        border: none;
        font-weight: bolder;
        color: #ffffff;
        border-radius: 10px;
        margin-top: 3%;
        cursor: pointer;
    }

    #checkout-button:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 2px #0000007a;
        transition: 0.3s;
    }

    @media (max-width:500px)  {
        #root-top {
            margin-top: 85px;
        }

        #bottom-information {
            flex-direction: column;
            width: 100%;
            margin-top: 10px;
        }

        #total-cost {
            margin: 10px 25px  0 auto;
            font-size: 35px;
        }

        #total-title {
            /* margin-right: auto; */
            font-weight: bolder;
        }

        #checkout {
            margin: auto;
        }

        #checkout-button {
            margin-top: 15px;
            width: 90vw;
            padding: 8px;
        }
    }
</style>

<script>
    import ShoppingCartItem from "./StoreComponents/ShoppingCartItem";
    import axios from 'axios';

    export default {
        name: "ShoppingCart",
        components: {
            ShoppingCartItem
        },
        data() {
            return {
                cart: JSON.parse(localStorage.getItem('cart')),
                name: "",
                price: 0.0,
                quantity: 0,
                image: "" ,
                products: [],
                totalCost: 0.0,
                cartEmpty: true
            }
        },
        methods: {
            loadProduct: function(id) {
                const url = process.env.VUE_APP_DOMAIN_NAME_PRODUCT;

                axios.get(url + "/product-by-id/" + id)
                .then((response) => {
                    this.products.push(response.data);
                }, (error) => {
                    console.log(error);
                });
            },
            deleteClick: function(index) {
                this.products.splice(index, 1);
                this.cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(this.cart));
            },
            cartCheck() {
                if(this.products.length > 0) {
                    this.cartEmpty = false;
                }
            }
        },
        watch: {
            products: function() {
                this.cartCheck();

                this.totalCost = 0;
                this.products.forEach(x => {
                    this.totalCost += x.price;
                });

                if(!this.products.length) {
                    this.$emit('emptyCart', 1);
                }
            }
        },
        beforeCreate() {
            this.cartCheck();
        },
        created() {
            this.cart.forEach(x => {
                this.loadProduct(x);
            });
        }
    }
</script>