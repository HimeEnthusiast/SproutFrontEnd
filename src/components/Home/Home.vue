<template>
    <div id="root-top">
        <Slideshow id="slideshow"></Slideshow>

        <div id="categories">
            <span class="category-title">
                <router-link class="router-link" :to="{name: 'products-category', params: {category: 'seeds'}}" @click="subcategoryExists(false)">
                    Seeds
                </router-link>
            </span>

            <span class="category-title">
                <router-link class="router-link" :to="{name: 'products-category', params: {category: 'planters'}}" @click="subcategoryExists(false)">
                    Planters
                </router-link>
            </span>

            <span class="category-title">
                <router-link class="router-link" :to="{name: 'products-category', params: {category: 'tools'}}" @click="subcategoryExists(false)">
                    Tools
                </router-link>
            </span>

            <span class="category-title">
                <router-link class="router-link" :to="{name: 'products-category', params: {category: 'soil'}}" @click="subcategoryExists(false)">
                    Soil
                </router-link>
            </span>
        </div>

        <div id="features">
            <h1>Featured Products: </h1>
            <div id="product-grid">
                <span id="product-items" v-for="product in products" :key="product.id">
                    <ProductSmallHome :image="product.image" :id="product.id" :name="product.name" :description="product.description" :price="product.price"></ProductSmallHome>
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root-top {
        font-family: 'Quicksand', sans-serif;
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        padding-bottom: 40px;
    }

    h1 {
        margin-left: 10px;
        padding-left: 10px;
    }

    #categories {
        display: none;
    }

    #features {
        padding-bottom: 40px;
    }

    #product-grid {
        justify-content: center;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 300px;
        gap: 20px;
        padding: 20px;
    }

    #slideshow {
        margin: 0 auto 40px auto;
    }

    @media (max-width:500px)  {
        #root-top {
            padding-top: 0;
        }

        h1 {
            font-size: 25px;
            padding-left: 10px;
        }

        #categories {
            display: grid;
            grid-template-columns: 1fr 1fr;
            margin: 30px 0 30px 0;
            gap: 10px;
            padding: 10px;
            justify-items: center;
        }

        .category-title {
            background-color: #00A896;
            text-align: center;
            line-height: 40px;
            border-radius: 50px;
            color: #ffffff;
            font-weight: bold;
            height: 40px;
            width: 80%;
        }

        #features {
            padding-bottom: 15px;
        }

        #product-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 200px 200px;
            gap: 20px;
            padding: 20px;
        }

        #slideshow {
            margin: 0 0 20px 0;
        }

        .router-link {
            text-decoration: none;
            color: #ffffff;
        }
    }
</style>

<script>
    import Slideshow from './HomeComponents/Slideshow';
    import ProductSmallHome from '../Store/StoreComponents/ProductSmallHome';
    import axios from 'axios';   

    export default {
        name: "Home",
        components: {
            Slideshow,
            ProductSmallHome
        },
        data() {
            return {
                products: [],
                category: "seeds",
                url: ""
            }
        },
        mounted() {
            this.getCategoryProducts();
        },
        methods: {
            getCategoryProducts() {
                console.log("Category: " + this.category);

                const url = process.env.VUE_APP_DOMAIN_NAME_PRODUCT;

                axios.get(url + "/products/" + this.category)
                    .then(response => {
                        this.products = response.data;
                });
            }
        }
    }
</script>