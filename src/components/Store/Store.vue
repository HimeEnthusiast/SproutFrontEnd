<template>
    <div id="root">
        <div id="top-bar">
            Store / {{ formatUpper(category) }} <span v-if="subcategory">/ {{ formatUpper(subcategory) }}</span>
        </div>

        <div id="bottom">
            <div id="product-grid">
                <span v-for="product in products" :key="product.id">
                    <ProductSmall image="url" :id="product.id" :name="product.name" :description="product.description" :price="product.price"></ProductSmall>

                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root {
        font-family: 'Quicksand', sans-serif;
    }

    #bottom {
        margin: 3% 1.5% 0 1.5%;
    }

    #top-bar {
        background-color: #F2F2F2;
        padding: 30px;
        width: 100%;
        position: relative;
        z-index: -100;
        color: #00A896;
    }

    #product-grid {
        width: 100%;
        justify-content: center;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 250px));
        height: 300px;
    }
</style>

<script>
    import ProductSmall from '../Store/StoreComponents/ProductSmall';
    import axios from 'axios';

    export default {
        name: "Store",
        components: {
            ProductSmall
        },
        data() {
            return {
                products: [],
                category: "",
                url: "",
                subcategory: ""
            }
        },
        mounted() {
            this.subcategory = this.$route.params.subcategory;
            this.category = this.$route.params.category;

            if(this.subcategory != null) {
                this.getSubcategoryProducts();
            } else {
                this.getCategoryProducts();
            }
        },
        methods: {
            formatUpper: function(str) {
                str = str.replace(/-/g, ' ');
                str = str.replace(/(^| )(\w)/g, s => s.toUpperCase());

                return str;
            },
            getCategoryProducts() {
                axios.get("https://www.isabellapiantoni.tech/product/api/products/" + this.category)
                    .then(response => {
                        this.products = response.data;
                });
            },
            getSubcategoryProducts() {
                axios.get("product/api/products/" + this.category + "/" + this.subcategory)
                    .then(response => {
                        this.products = response.data;
                });
            }
        },
        watch: {
            $route: function() {
                this.category = this.$route.params.category;
                this.subcategory = this.$route.params.subcategory;
            },
            subcategory: function() {
                this.getSubcategoryProducts();
            },
            category: function() {
                this.getCategoryProducts();
            }
        }
    }
</script>