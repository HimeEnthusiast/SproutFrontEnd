<template>
    <div id="root">
        <div id="title" ref="title" @mouseover="drop" @mouseleave="close"> 
            <router-link class="router-link" :to="{name: 'products-category', params: {category: category.replace(/\s+/g, '-').toLowerCase()}}">{{title}}</router-link>
        </div>

        <div id="dropdown" ref="dropdown" @mouseover="drop" @mouseleave="close">
            <p v-for="subcategory in subcategories" :key="subcategory.id">
                <router-link class="router-link" :to="{name: 'products-subcategory', params: {category: category, subcategory: subcategory.replace(/\s+/g, '-').toLowerCase()}}">{{subcategory}}</router-link>
            </p>
        </div>
    </div>
</template>

<!-- CSS -->
<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root {
        font-family: 'Quicksand', sans-serif;
        height: 100%;
    }

    #title {
        height: 100%;
        padding: 1.1em 1em 1.1em 1em;
        display: flex;
        align-items: center;
        position: sticky;
        color: #00A896;
        font-weight: bold;
        text-align: center;
        font-size: 20px;
    }

    #dropdown {
        display: none;
        background-color: #FFFFFF;
        color: #00A896;
        width: 100%;
        position: absolute;
        left: 0;
        box-shadow: 0 3px 5px -3px #0000007a;
    }

    p {
        padding: 11px;
        margin: 0;
    }

    p:hover {
        background-color: #F2F2F2;
    }

    .router-link {
        text-decoration: none;
        color: #00A896;
    }
/* 
    @media only screen and (max-width: 990px) {

        #title {
            padding: 0 20% 0 20%;
            margin: auto;
            width: 100%;
        }
    } */

</style>

<script>
    import axios from 'axios';
    // import https from 'https';

    export default {
        data() {
            return {
                subcategories: []
            }
        },
        mounted() {
            // axios.get("https://www.isabellapiantoni.tech/api/subcategory-per-category/" + this.category, {
            //     headers: {
            //         'Content-Type' : 'application/json'
            //     }
            // })
            // .then((response) => {
            //     // response.data.forEach(x => {
            //     //     this.subcategories.push(x);
            //     // });
            //     console.log(response.data);
            // }, (error) => {
            //     console.log(error);
            // });

            const apiClient = axios.create({ 
                // httpsAgent: new https.Agent({
                //     rejectUnauthorized: false
                // }),
                baseURL: 'https://isabellapiantoni.tech:8081/api', 
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                }
            });

                apiClient.get("/subcategory-per-category/" + this.category)
                    .then((response) => {
                        console.log(response.data);
                    });
        },
        methods: {
            drop: function() {
                let title = this.$refs["title"];
                let dropdown = this.$refs["dropdown"];

                dropdown.style.display = "block";
                title.style.backgroundColor = "#ffffff";
                title.style.color = "#00A896";
            },
            close: function() {
                let title = this.$refs["title"];
                let dropdown = this.$refs["dropdown"];

                dropdown.style.display = "none";
                title.style.backgroundColor = "transparent";
                title.style.color = "#00A896";
            }
        },
        props: [
            'title',
            'category',
            'subcategory'
            ]
    }
</script>