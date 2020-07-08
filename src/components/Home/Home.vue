<template>
    <div id="root-top">
        <Slideshow id="slideshow"></Slideshow>

        <div id="categories">
            <span class="category-title">
                Seeds
            </span>

            <span class="category-title">
                Planters
            </span>

            <span class="category-title">
                Tools
            </span>

            <span class="category-title">
                Soil
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
    }

    #categories {
        display: none;
    }

    #features {
        width: 100%;
        margin: 0 auto 0 auto;
    }

    #product-grid {
        justify-content: center;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 300px;
    }

    #slideshow {
        margin: 0 auto 20px auto;
    }

    @media (max-width:500px)  {
        #root-top {
            padding-top: 0;
        }

        h1 {
            font-size: 25px;
        }

        #categories {
            display: grid;
            grid-template-columns: 50% 50%;
            grid-template-rows: 50px 50px;
            margin-top: 20px;
        }

        .category-title {
            background-color: #F2F2F2;
            text-align: center;
            line-height: 50px;
            margin: 1px;
        }

        #features {
            width: 100%;
            padding: 0;
            margin: 0;
        }

        #product-grid {
            grid-template-columns: 50% 50%;
            grid-template-rows: 210px 210px;
        }

        #slideshow {
            margin: 0 0 20px 0;
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