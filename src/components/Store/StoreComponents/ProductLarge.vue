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
                <div id="product-price">
                        ${{price.toFixed(2)}}
                </div>

                <div id="right-inner">
                    <router-link class="router-link" :to="{name: 'shopping-cart'}">
                        <button id="add-cart-button" ref="add-cart-button" @click="addToCart()">Add to Cart</button>
                    </router-link>
                    <div id="product-desc">
                        {{description}}
                    </div>
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
        min-height: calc(100vh - 92px);
    }

    .router-link {
        text-decoration: none;
        color: #ffffff;
    }

    #bottom {
        display: flex;
        flex-direction: row;
        padding: 30px;
        justify-content: center;
    }

    #product-photo {
        width: 30vw;
        height: 60vh;
        min-width: 400px;
        margin: 2%;
        border-radius: 10px;
        box-shadow: 0 3px 5px #0000007a;
        object-fit: cover;
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
        width: 40%;
        margin: 2%;
    }

    #right-inner {
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    #product-name {
        font-size: 35px;
        font-weight: bolder;
        color: #000000;
    }

    #product-desc {
        font-size: 20px;
        color: #000000;
        width: 80%;
        padding-top: 40px;
    }

    #product-price {
        font-size: 25px;
    }

    #add-cart-button {
        font-size: 20px;
        width: 80%;
        font-family: 'Quicksand', sans-serif;
        padding: 15px 25px 15px 25px;
        align-self: start;
        background-color: #00A896;
        border: none;
        font-weight: bolder;
        color: #ffffff;
        border-radius: 5px;
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
            justify-content: center;
            padding-bottom: 100px;
        }

        #product-photo {
            width: 80vw;
            height: 50vh;
            margin: 0 auto 0 auto;
        }

        #product-desc {
            margin-top: 10px;
            width: 100%;
        }

        #right {
            width: 100%;
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

        #add-cart-button {
            width: 100%;
        }
    }

    @media (max-width:600px)  {
        #right {
            position: initial;
            flex-direction: column;
            width: 100%;
            margin: 0;
        }

        #top-bar {
            padding: 15px;
        }

        #bottom {
            flex-direction: column;
            padding: 20px;
            padding-bottom: 80px;
        }

        #product-photo {
            height: 40vh;
            margin: 10px auto 25px auto;
            min-width: 300px;
        }

        #product-name {
            font-size: 30px;
            margin-bottom: 10px;
        }

        #product-desc {
            font-size: 20px;
            width: 100%;
            padding-top: 30px;
        }

        #right-inner {
            position: initial;
            flex-direction: row;
        }

        #add-cart-button {
            font-size: 20px;
            padding: 15px;
            width: 100%;
            min-width: 200px;
        }

        #product-price {
            font-size: 20px;
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
                product: {
                    id: 0,
                    quantity: 0
                },
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

                let prod = {
                    id: this.id,
                    quantity: 1
                }

                // console.log(prod);
                
                // this.cart.push(this.id);
                // localStorage.setItem('cart', JSON.stringify(this.cart));
                
                if(this.cart.length > 0) {
                    this.cart.forEach(x => {
                        if(x.id == this.id) {
                            console.log("This array is more than 0, and this id has been found.");
                            x.quantity++;
                            localStorage.setItem('cart', JSON.stringify(this.cart));
                        } else {
                            console.log("This array is more than 0, but this id has not been found.");
                            this.cart.push(prod);
                            localStorage.setItem('cart', JSON.stringify(this.cart));
                        }
                    });
                } else {
                    console.log("This array is more than 0, and this id has been found.");
                    this.cart.push(prod);
                    localStorage.setItem('cart', JSON.stringify(this.cart));
                }
            }
        }
    }
</script>