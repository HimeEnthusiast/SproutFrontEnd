<template>
    <div id="root-top">
        <div id="top-bar">
            Store / {{ formatUpper(category) }} <span v-if="subcategory">/ {{ formatUpper(subcategory) }}</span>
        </div>

        <div id="bottom">
            <div id="product-grid">
                <span v-for="product in products" :key="product.id">
                    <ProductSmall :image="product.image" :id="product.id" :name="product.name" :description="product.description" :price="product.price"></ProductSmall>

                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root-top {
        font-family: 'Quicksand', sans-serif;
        min-height: calc(100vh - 60px);
    }

    #bottom {
        margin: 3% 1.5% 0 1.5%;
    }

    #top-bar {
        background-color: #F2F2F2;
        padding: 40px 30px 30px 30px;
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
        gap: 20px;
        padding-bottom: 80px;
    }

    @media (max-width:690px)  {
        #top-bar {
            padding: 15px;
            margin-top: 0px;
        }

        #product-grid {
            grid-template-columns: repeat(auto-fill, minmax(100px, 150px));
            padding-bottom: 60px;
            gap: 20px;
        }
    }
</style>

<script>
    import ProductSmall from '../Store/StoreComponents/ProductSmallHome';
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
        created() {
            this.subcategory = this.$route.params.subcategory;
            this.category = this.$route.params.category;

            if(this.$store.getters.getSubcategory) {
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
                console.log("Category: " + this.category);

                const url = process.env.VUE_APP_DOMAIN_NAME_PRODUCT;

                axios.get(url + "/products/" + this.category)
                    .then(response => {
                        this.products = response.data;
                });
            },
            getSubcategoryProducts() {
                console.log("Subcategory: " + this.subcategory);

                const url = process.env.VUE_APP_DOMAIN_NAME_PRODUCT;

                axios.get(url + "/products/" + this.category + "/" + this.subcategory)
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