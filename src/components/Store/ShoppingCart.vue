<template>
    <div id="root-top">
        <div id="empty-cart" v-if="cartEmpty">
            <div id="empty-line1">Your cart is empty!</div>
            <br>Add some items to your cart so you can checkout.
        </div>

        <div id="item-list">
            <div id="cart-items" v-for="product in products" :key="product.id">
                <ShoppingCartItem
                    :key="reset" 
                    :image="product.image" 
                    :name="product.name" 
                    :price="product.price" 
                    :quantity="product.quantity" 
                    @clicked="deleteClick(product.id)"
                    @increase="increaseQuantity(product)"
                    @decrease="decreaseQuantity(product)"></ShoppingCartItem>
                <hr>
            </div>
        </div>

        <div id="bottom-information" v-if="!cartEmpty">
            <div id="total-cost">
                <span id="total-title">Total:</span>
                <span id="cost-title">${{totalCost.toFixed(2)}}</span>
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
        min-height: 90vh;
        padding: 30px;
        padding-bottom: 100px;
    }

    hr {
        margin: 15px;
    }

    .router-link {
        text-decoration: none;
        color: #ffffff;
    }

    #empty-cart {
        text-align: center;
        font-size: 300%;
        padding-top: 100px;
    }

    #empty-line1 {
        font-weight: bolder;
    }

    #bottom-information {
        display: flex;
        flex-direction: column;
        width: 90%;
        margin: 2% auto 2%;
        padding: 20px;
    }

    #total-cost {
        margin-top: 1%;
        font-size: 250%;
        color: #000000;
        margin-left: auto;
    }

    #total-title {
        font-weight: bolder;
        /* float: left; */
    }

    #cost-title {
        padding-left: 20px;
        padding-right: 5px;
    }

    #checkout {
        margin-left: auto;
    }

    #checkout-button {
        font-size: 30px;
        font-family: 'Quicksand', sans-serif;
        padding: 15px 25px 15px 25px;
        align-self: start;
        background-color: #00A896;
        border: none;
        font-weight: bolder;
        color: #ffffff;
        border-radius: 10px;
        margin-top: 25px;
        cursor: pointer;
        width: 250px;
    }

    #checkout-button:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 2px #0000007a;
        transition: 0.3s;
    }

    #item-list {
        width: 80%;
        /* justify-content: center; */
        margin: auto;
    }

    @media (max-width:690px)  {
        #root-top {
            padding: 20px;
            padding-bottom: 130px;
        }

        hr {
            margin: 5px;
        }

        #bottom-information {
            flex-direction: column;
            width: 270px;
            padding: 15px;
            border: 1px solid #000000;
            border-radius: 10px;
        }

        #total-cost {
            font-size: 20px;
        }

        #total-title {
            float: left;
            font-weight: bolder;
        }

        #cost-title {
            margin-left: auto;
            float: right;
        }

        #checkout {
            margin: auto;
        }

        #item-list {
            margin-bottom: 35px;
            width: 100%;
        }

        #checkout-button {
            margin-top: 15px;
            width: 270px;
            font-size: 20px;
            padding: 10px;
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
                quantity: 1,
                image: "" ,
                products: [],
                totalCost: 0.0,
                cartEmpty: true,
                reset: 0
            }
        },
        methods: {
            loadProduct: function(id, quantity) {
                const url = process.env.VUE_APP_DOMAIN_NAME_PRODUCT;

                axios.get(url + "/product-by-id/" + id)
                .then((response) => {
                    response.data.quantity = quantity;
                    
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
            },
            increaseQuantity(product) {
                product.quantity = product.quantity + 1;

                this.cart.forEach(x => {
                    if(x.id == product.id) {
                        console.log("Yes! " + x.id + " and " + product.id + " match.");
                        x.quantity++;
                        localStorage.setItem('cart', JSON.stringify(this.cart));
                    } else {
                        console.log("No!" + x.id + " and " + product.id + " do not match.");
                    }
                });
                
                return product;
            },
            decreaseQuantity(product) {
                if(product.quantity < 2) {
                    console.log("No");
                } else {
                    product.quantity = product.quantity - 1;

                    this.cart.forEach(x => {
                        if(x.id == product.id) {
                            console.log("Yes! " + x.id + " and " + product.id + " match.");
                            x.quantity--;
                            localStorage.setItem('cart', JSON.stringify(this.cart));
                        } else {
                            console.log("No!" + x.id + " and " + product.id + " do not match.");
                        }
                    });
                }

                return product;
            }
        },
        watch: {
            products: {
                deep: true,
                handler() {
                    this.cartCheck();

                    this.totalCost = 0;
                    this.products.forEach(x => {
                        // this.totalCost += x.price;
                        this.cart.forEach(y => {
                            if (y.id == x.id) {
                                if(y.quantity > 1) {
                                    for(let i = 0; i < y.quantity; i++) {
                                        this.totalCost += x.price;
                                    }
                                } else {
                                    this.totalCost += x.price;
                                }
                            }
                        });
                    });

                    if(!this.products.length) {
                        this.$emit('emptyCart', 1);
                    }
                }
            }
        },
        beforeCreate() {
            this.cartCheck();
        },
        created() {
            this.cart.forEach(x => {
                this.loadProduct(x.id, x.quantity);
            });
        }
    }
</script>