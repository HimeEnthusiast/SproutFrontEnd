<template>
    <div id="root">
        <div class="category-title">
            <router-link class="router-link" :to="{name: 'products-category', params: {category: category.replace(/\s+/g, '-').toLowerCase()}}" @click="subcategoryExists(false)">
                    {{category}}
            </router-link>

            <button id="arrow-button" @click="dropDown()">
                <img id="arrow-icon" ref="arrow-icon" src="../../assets/arrow.svg" data-rotation="180">
            </button>
        </div>
        <div id="dropdown-container" ref="dropdown" data-open="false">
            <span class="subcategory" data-open="false" v-for="subcategory in subcategories" :key="subcategory.id">
                <router-link 
                    class="router-link" 
                    :to="{name: 'products-subcategory', 
                    params: {category: category, 
                    subcategory: subcategory.replace(/\s+/g, '-').toLowerCase()}}" 
                    @click="subcategoryExists(true)">
                    {{subcategory}}
                </router-link>
            </span>
        </div>
    </div>
</template>

<style scoped>
    button {
        outline: none;
    }

    .category-title {
        padding: 20px;
        font-size: 7vw;
    }

    #arrow-button {
        background-color: transparent;
        border: none;
        width: 15%;
        height: 100%;
    }

    #arrow-icon[data-rotation="180"] {
        width: 60%;
        height: 25px;
        margin-top: auto;
        transform: rotate(180deg);
    }

    #arrow-icon[data-rotation="0"] {
        width: 60%;
        height: 25px;
        margin-top: auto;
        transform: rotate(0deg);
    }

    #dropdown-container[data-open="false"] {
        /* height: 0; */
        display: none;
    }

    #dropdown-container[data-open="true"] {
        height: 100%;
        background-color: #B2EDE0;
        width: 100%;
        display: flex;
        
        flex-direction: column;
        font-weight: normal;
        font-size: 25px;
        margin-top: -10px;
        padding: 10px 0 10px 0;
    }

    .subcategory[data-open="true"] {
        display: block;
        /* font-size: 5vw; */
    }

    .subcategory {
        padding: 10px;
        font-size: 5vw;
    }

    .router-link {
        text-decoration: none;
        color: #00A896;
    }
</style>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                subcategories: []
            }
        },
        props: {
            category: String
        },
        created() {
            const url = process.env.VUE_APP_DOMAIN_NAME_PRODUCT;

            axios.get(url + "/subcategory-per-category/" + this.category, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            .then((response) => {
                response.data.forEach(x => {
                    this.subcategories.push(x);
                });
            }, (error) => {
                console.log(error);
            });
        },
        methods: {
            dropDown() {
                let arrow = this.$refs["arrow-icon"];
                let dropdown = this.$refs["dropdown"];

                
                if(arrow.getAttribute("data-rotation") == 0) { //if open
                    arrow.setAttribute("data-rotation", 180);
                    arrow.classList.add("rotate-180");
                    arrow.style.transition = "all 0.4s";

                    dropdown.setAttribute("data-open", false);
                    dropdown.classList.add("dropdown-false");
                    dropdown.style.transition = "all 0.4s";
                } else { //if closed
                    arrow.setAttribute("data-rotation", 0);
                    arrow.classList.add("rotate-0");
                    arrow.style.transition = "all 0.4s";

                    dropdown.setAttribute("data-open", true);
                    dropdown.classList.add("dropdown-true");
                    dropdown.style.transition = "all 0.4s";

                    
                }
            },
            subcategoryExists(exists) {
                if(exists) {
                    this.$store.commit('setSubcategory', true);
                } else {
                    this.$store.commit('setSubcategory', false);
                }
            }
        }
    }
</script>