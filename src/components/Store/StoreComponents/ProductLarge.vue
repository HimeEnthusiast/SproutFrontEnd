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
                        ${{price.toFixed(2)}}
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
        padding: 30px;
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
        font-size: 5vw;
        font-weight: bolder;
    }

    #product-desc {
        font-size: 2.5vw;
    }

    #product-price {
        font-size: 350%;
    }

    #add-cart-button {
        font-size: 30px;
        min-width: 250px;
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
        cursor: pointer;
    }

    @media (max-width:950px)  {
        #bottom {
            flex-direction: column;
        }

        #product-photo {
            width: 85%;
            margin: 0 auto 0 auto;
        }

        #product-desc {
            margin-top: 10px;
        }

        #right-inner {
            flex-direction: row;
            position: inherit;
            margin-top: 30px;
            width: 100%;
        }

        #product-price {
            margin-right: 30px;
        }
    }

    @media (max-width:600px)  {
        #right {
            position: initial;
            flex-direction: column;
            width: 100%;
        }

        #top-bar {
            margin-top: 60px;
            padding: 15px;
        }

        #bottom {
            flex-direction: column;
            padding: 15px;
        }

        #product-photo {
            width: 100%;
            margin: 10px auto 30px auto;
        }

        #product-name {
            font-size: 30px;
            margin-bottom: 10px;
        }

        #product-desc {
            font-size: 20px;
        }

        #right-inner {
            position: initial;
            flex-direction: row;
            margin: 40px auto auto 8px;
        }

        #add-cart-button {
            font-size: 20px;
            padding: 15px;
            width: 150px;
            min-width: 200px;
        }

        #product-price {
            font-size: 30px;
            padding: 10px;
            margin-right: 15px;
        }
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
                image: "",
                cart: [],
                addCartButton: ""
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            this.addToCartButton = this.$refs["add-cart-button"];
            const url = process.env.VUE_APP_DOMAIN_NAME_PRODUCT;
            
            axios.get(url + "/product-by-id/" + this.id)
            .then((response) => {
                this.name = response.data.name;
                this.description = response.data.description;
                this.price = response.data.price;
                this.category = response.data.category;
                this.subcategory = response.data.subcategory;
                this.image = response.data.image;

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