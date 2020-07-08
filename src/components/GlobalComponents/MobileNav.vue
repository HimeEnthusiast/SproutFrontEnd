<template>
    <div id="root">
        <div id="top-bar">
            <button id="menu-button" @click="changeMenu()">
                <img id="menu-icon" ref="menu-icon" src="../../assets/bars-solid.svg">
            </button>

                <router-link :to="{name: 'home'}">
                   <img id="sprout-logo" src="../../assets/logoaltcolour.svg">
                </router-link>

            <router-link id="cart-button" class="router-link" :to="{name: 'shopping-cart'}">
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
        </div>

        <div id="side-bar" ref="side-bar">
            <div id="categories" v-for="category in categories" :key="category">
                <MobileDropdown :category="category"></MobileDropdown>
            </div>
            <hr>
            <div id="account-links">
                <span id="login" class="account-title">
                    <router-link v-if="!jwtExists" :style="jwtExists ? 'padding: 0;' : 'padding: 20px;'" class="router-link" :to="{name: 'login'}">Login</router-link>
                </span>
                <span id="register" class="account-title">
                    <router-link v-if="!jwtExists" :style="jwtExists ? 'padding: 0;' : 'padding: 20px;'" class="router-link" :to="{name: 'register'}">Register</router-link>
                </span>
                <span id="account" class="account-title">
                    <router-link v-if="jwtExists" :style="!jwtExists ? 'padding: 0;' : 'padding: 20px;'" class="router-link" :to="{name: 'account', params: {id: id}}">Account</router-link>
                </span>
                <span id="logout" class="account-title">
                    <router-link v-if="jwtExists" :style="!jwtExists ? 'padding: 0;' : 'padding: 20px;'" class="router-link" :to="{name: 'logout'}">Logout</router-link>
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    button {
        outline: none;
    }

    .router-link {
        text-decoration: none;
        color: #00A896;
    }

    #root {
        font-family: 'Quicksand', sans-serif;
        color: #00A896;
        position: relative;
    }

    #top-bar {
        height: 40px;
        width: calc(100% - 20px);
        padding: 10px;
        background-color: #B2EDE0;
        box-shadow: 0 3px 5px #0000007a;
        display: flex;
        position: absolute;
        z-index: 100;
    }

    #menu-button {
        background-color: transparent;
        border: none;
        padding: 0;
        height: 75%;
        margin: auto 15px auto 0;
    }

    #menu-icon {
        height: 100%;
    }

    #sprout-logo {
        width: 110px;
        margin-top: 5px;
    }

    #cart-svg {
        height: 100%;
        fill: #00A896;
    }

    #cart-button {
        margin: auto 0 auto auto;
        height: 75%;
    }

    #side-bar {
        min-height: 100vh;
        /* height: 100%; */
        background-color: #ffffff;
        position: absolute;
        width: 100%;
        left: -120%;
        /* top: 0; */
        margin-top: 60px;
        padding-top: 20px;
        z-index: 99;
    }

    #categories {
        text-align: center;
        font-size: 250%;
        font-weight: bolder;
    }

    hr {
        margin: 25px;
        /* border-color: #B2EDE0; */
        border: 0.3px solid #00A896;
    }

    #account-links {
        text-align: center;
        margin-top: 20px;
    }

    .account-title {
        font-size: 150%;
    }
</style>

<script>
    import MobileDropdown from './MobileDropdown';
    import axios from 'axios';

    export default {
        components: {
            MobileDropdown
        },
        data() {
            return {
                categories: ["Seeds", "Planters", "Tools", "Soil"],
                id: this.$store.getters.getUserId,
                jwt: "",
                jwtExists: this.$store.getters.getAuthentication
            }
        },
        created() {
            if(this.$cookies.get('jwt')) {
                this.$store.commit('setAuthentication', true);
                this.jwt = this.$cookies.get('jwt').replace(/"/g,"");
            }
        },
        mounted() {
            this.getUserId();
        },
        methods: {
            changeMenu() {
                let menu = this.$refs["side-bar"];
                let menuIcon = this.$refs["menu-icon"];

                if(menu.style.left == "0px") { //If open, close
                    menu.style.left = "-120%";
                    menu.style.transition = "all 0.4s";
                    menuIcon.style.transform = "rotate(0deg)";
                } else {
                    menu.style.left = "0px";
                    menu.style.transition = "all 0.4s";
                    menuIcon.style.transform = "rotate(90deg)";
                    menuIcon.style.transition = "all 0.4s";
                }
            },
            getUserId() {
                const url = process.env.VUE_APP_DOMAIN_NAME_AUTH;

                axios.get(url + "/user-id", {
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