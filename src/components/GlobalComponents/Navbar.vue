<template>
  <div id="root">
    <div id="top-container">
        <span id="login">
            <router-link v-if="!jwtExists" class="router-link" :to="{name: 'login'}">Login</router-link>
        </span>
        <span id="register">
            <router-link v-if="!jwtExists" class="router-link" :to="{name: 'register'}">Register</router-link>
        </span>

        <span id="logout">
            <router-link v-if="jwtExists" class="router-link" :to="{name: 'logout'}">Logout</router-link>
        </span>
    </div>

    <div id="bottom-container">
      <!-- TODO: Seeds, Pots, Tools, Soil // Account -->
    <router-link :to="{name: 'home'}"><img src="../../assets/logoaltcolour.svg"></router-link>

      <span id="categories">
        <Dropdown title="Seeds" category="seeds"></Dropdown>
        <Dropdown title="Planters" category="planters"></Dropdown>
        <Dropdown title="Tools" category="tools"></Dropdown>
        <Dropdown title="Soil" category="soil"></Dropdown>
      </span>

      <span id="icons">
        <router-link class="router-link" :to="{name: 'account', params: {id: id}}"> <!-- Get user info and put params here -->
            <svg
                id="user-svg" 
                aria-hidden="true" 
                focusable="false" 
                data-prefix="fas" 
                data-icon="user" 
                class="svg-inline--fa fa-user fa-w-14" 
                role="img" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 448 512">
                <path 
                    d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z">
                    </path>
            </svg>
        </router-link>

        <router-link class="router-link" :to="{name: 'shopping-cart'}">
            <svg
                id="cart-svg"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="shopping-cart"
                class="svg-inline--fa fa-shopping-cart fa-w-18"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                >
                <path
                    d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
                />
            </svg>
        </router-link>
      </span>
    </div>
  </div>
</template>

<!-- CSS -->
<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root {
        font-family: 'Quicksand', sans-serif;
    }

    .router-link {
        text-decoration: none;
        color: #ffffff;
    }

    #top-container {
        background-color: #00A896;
        padding: 6px;
        vertical-align: middle;
        text-align: end;
        position: relative;
        z-index: 100;
        box-shadow: 0 1px 5px #0000004a;
    }

    #bottom-container {
        background-color: #B2EDE0;
        display: flex;
        align-items: center;
        box-shadow: 0 3px 5px #0000007a;
    }

    img {
        width: 150px;
        margin-right: 20px;
        margin-left: 10px;
        cursor: pointer;
    }

    #categories {
        display: flex;
        width: 75%;
    }

    #icons {
        margin-left: auto;
        width: 20%;
        text-align: right;
    }

    #user-svg, #cart-svg {
        fill: #00A896;
        width: 30px;
        padding: 10px;
    }

    #user-svg {
        width: 24px;
        margin-right: 10px
    }

    #user-svg:hover, #cart-svg:hover {
        fill: #ffffff;
    }

    #register, #login, #logout {
        margin-right: 20px;
    }

    @media only screen and (max-width: 767px) {
        /* #bottom-container {
            background-color: blue;
        } */
    }
</style>

<script>
    import Dropdown from "./Dropdown";
    import axios from 'axios';

    export default {
        name: "Navbar",
        components: {
            Dropdown
        },
        data() {
            return {
                logoImage: "../../assets/logoaltcolour.svg",
                id: this.$store.getters.getUserId,
                jwt: "",
                jwtExists: this.$store.getters.getAuthentication
            }
        },
        beforeCreate() {
            if(this.$cookies.get('jwt')) {
                this.$store.commit('setAuthentication', true);
                this.jwt = this.$cookies.get('jwt').replace(/"/g,"");
            }
        },
        mounted() {
            this.getUserId();
        },
        methods: {
            getUserId() {
                axios.get("auth/api/user-id", {
                    headers: {
                        'Authorization': 'Bearer ' + this.jwt
                    }
                }).then((response) => {
                    this.$store.commit('setUserId', response.data);
                }, (error) => {
                    console.log(error);
                });
            }
        }
    }
</script>