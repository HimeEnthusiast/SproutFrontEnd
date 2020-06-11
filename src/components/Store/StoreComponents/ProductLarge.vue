<template>
    <div id="root">
        <div id="top-bar">
            Store / {{category}} <span v-if="subcategory">/ {{subcategory}}</span> <span v-if="name">/ {{name}}</span>
        </div>
        <div id="bottom">
            <img id="product-photo" v-bind:src="image" />
            <div id="right">
                <div id="product-name">
                    {{name}}
                </div>
                <div id="product-desc">
                    {{description}}
                </div>

                <div id="right-inner">
                    <div id="product-price">
                        ${{price}}
                    </div>
                    <router-link class="router-link" :to="{name: 'shopping-cart'}">
                        <button id="add-cart-button" ref="add-cart-button" @click="addToCart()">Add to Cart</button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root {
        font-family: 'Quicksand', sans-serif;
        color: #00A896;
    }

    .router-link {
        text-decoration: none;
        color: #ffffff;
    }

    #bottom {
        display: flex;
        flex-direction: row;
    }

    #product-photo {
        width: 45%;
        margin: 2%;
        border-radius: 10px;
        box-shadow: 0 3px 5px #0000007a;
    }

    #top-bar {
        background-color: #F2F2F2;
        padding: 30px;
        position: relative;
        z-index: -100;
        color: #00A896;
    }

    #right {
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: left;
        width: 47%;
        margin: 2%;
    }

    #right-inner {
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    #product-name {
        font-size: 400%;
        font-weight: bolder;
    }

    #product-desc {
        font-size: 150%;
    }

    #product-price {
        font-size: 350%;
    }

    #add-cart-button {
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
    }

    #add-cart-button:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 2px #0000007a;
        transition: 0.3s;
    }
</style>

<script>
    import axios from 'axios';

    export default {
        name: "ProductLarge",
        data() {
            return {
                id: 0,
                name: "",
                description: "",
                price: 0.0,
                category: "",
                subcategory: "",
                image: "https://www.thespruceeats.com/thmb/YyyMF4DhOpY8Vx750FPBvxBDLIc=/4288x2848/filters:fill(auto,1)/sauteed-broccoli-482862-Hero-5b96d87146e0fb0050721d12.jpg",
                cart: [],
                addCartButton: ""
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            this.addToCartButton = this.$refs["add-cart-button"];
            
            axios.get("product/api/product-by-id/" + this.id)
            .then((response) => {
                this.name = response.data.name;
                this.description = response.data.description;
                this.price = response.data.price;
                this.category = response.data.category;
                this.subcategory = response.data.subcategory;

            }, (error) => {
                console.log(error);
            });
        },
        methods: {
            addToCart: function() {
                if(localStorage.getItem('cart') != null) {
                    this.cart = JSON.parse(localStorage.getItem('cart'));
                }
                
                this.cart.push(this.id);
                localStorage.setItem('cart', JSON.stringify(this.cart));
            }
        }
    }
</script>