<template>
    <div id="root-top">
        <div id="loader">
            <img id="loading-icon" src="../../assets/spinner.svg">
        </div>

        <div id="container">
            <div id="title">
                <h1>Checkout</h1>
            </div>

            <form id="forms" @submit.prevent="sendData()" novalidate>
                <!-- <FormCarousel></FormCarousel> -->
                <VueSlickCarousel ref="carousel" v-bind="settings">
                    <div id="address">
                        <AddressForm ref="addressForm"
                                    @address1="address1 = $event" 
                                    @address2="address2 = $event"
                                    @city="city = $event"
                                    @province="province = $event"
                                    @postalcode="postalcode = $event"
                                    @saveAddress="saveAddress = $event"
                                    @formComplete="next()">
                        </AddressForm>
                    </div>

                    <div id="payment">
                        <PaymentForm @cardBearer="cardBearer = $event"
                                    @ccNumber="ccNumber = $event"
                                    @cvv="cvv = $event"
                                    @savePayment="savePayment = $event"
                                    @formComplete="next()">
                        </PaymentForm>
                    </div>

                    <div id="guest-email">
                        <GuestEmailForm v-if="!jwtPresent"
                            @email="email = $event"
                            @formComplete="submitForm()">
                        </GuestEmailForm>

                        <!-- <div id="submit-container">
                            <input type="submit" id="order-button" value="Complete Order" />
                        </div> -->
                    </div>
                </VueSlickCarousel>
            </form>
        </div>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root-top {
        display: flex;
        justify-content: center;
        font-family: 'Quicksand', sans-serif;
        min-height: calc(100vh - 60px);
    }

    #container {
        width: 90%;
        padding-top: 15px;
    }

    #forms {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 90%;
        margin: 0;
        padding-bottom: 100px;
    }

    #loader {
        position: absolute;
        display: none;
        width: 100%;
        height: calc(100vh - 100.8px);
        background: #0000007a;
        margin-top: -2%;
        z-index: 100;
    }

    #loading-icon {
        position: relative;
        margin: auto;
    }

    #left {
        /* width: 49%; */
    }

    #right {
        /* width: 49%; */
    }

    #submit-container {
        display: flex;
        justify-content: center;
    }

    #order-button {
        font-size: 2vw;
        font-family: 'Quicksand', sans-serif;
        padding: 2vh 2vw 2vh 2vw;
        background-color: #00A896;
        border: none;
        font-weight: bolder;
        color: #ffffff;
        border-radius: 10px;
        bottom: 0;
    }

    #order-button:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 2px #0000007a;
        transition: 0.3s;
        cursor: pointer;
    }

    @media (max-width:690px)  {
        #root-top {
            margin-top: 40px;
        }

        #forms {
            flex-direction: column;
        }

        #left {
            width: 100%;
            margin-left: 0;
        }

        #right {
            width: 100%;
            margin-top: -20px;
        }

        #order-button {
            position: initial;
            font-size: 25px;
            padding: 15px;
            width: 65vw;
            margin-top: 15px;
            margin-bottom: 35px;
        }

        #loader {
            position: absolute;
            width: 100%;
            height: 100%;
            background: #0000007a;
            margin-top: 19px;
            z-index: 100;
        }

        #loading-icon {
            position: relative;
            margin: auto;
            margin-top: 50%;
            display: block;
        }
    }
</style>

<script>
    import axios from 'axios';

    import AddressForm from "./StoreComponents/AddressForm";
    import PaymentForm from "./StoreComponents/PaymentForm";
    import GuestEmailForm from "./StoreComponents/GuestEmailForm";
    import VueSlickCarousel from 'vue-slick-carousel';
    import 'vue-slick-carousel/dist/vue-slick-carousel.css';
    import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

    export default {
        name: "checkout",
        components: {
            AddressForm,
            PaymentForm,
            GuestEmailForm,
            VueSlickCarousel
        },
        data() {
            return {
                email: "",
                address1: "",
                address2: "",
                city: "",
                province: "",
                postalcode: "",
                cardBearer: "",
                ccNumber: "",
                cvv: "",
                saveAddress: false,
                savePayment: false,
                jwtPresent: this.$store.getters.getAuthentication,
                cart: [],
                jwt: this.$cookies.get('jwt').replace(/"/g,""),
                settings: {
                    "draggable": false,                    
                }
            }
        },
        mounted() {
            alert("Please Note: \n\nThis is a FAKE store, created only to showcase in my portfolio. There is nothing being sold. Make sure to not enter any real personal information when using this form, as it will be saved in a database.\n\nThank you!\n\n");

            if(localStorage.getItem('cart')) {
                this.cart = JSON.parse(localStorage.getItem('cart'));
            }
        },
        methods: {
            submitForm() {
                // let form = document.getElementById("forms");
                
                alert("hi");
                // form.submit();
            },
            sendData() {
                const url = process.env.VUE_APP_DOMAIN_NAME_AUTH;
                // this.$store.commit('setLoadingStatus', true);
                document.getElementById("loader").style.display = "flex";

                if(this.jwtPresent) {
                    axios.post(url + "/checkout", {
                        products: this.cart,
                        address1: this.address1,
                        address2: this.address2,
                        city: this.city,
                        province: this.province,
                        postalcode: this.postalcode,
                        ccNumber: this.ccNumber,
                        cardBearer: this.cardBearer,
                        cvv: this.cvv,
                        saveAddress: this.saveAddress,
                        savePayment: this.savePayment,
                        jwtPresent: this.jwtPresent
                    },
                    {
                        headers: {
                            'Authorization': 'Bearer ' + this.jwt
                        }
                    }).then((response) => {
                        let id = response.data.id;
                        localStorage.removeItem('cart');
                        this.$router.push({path: `/checkout/${id}/complete`});
                    }, (error) => {
                        console.log(error);
                    });
                } else {
                    axios.post(url + "/checkout-as-guest", {
                        email: this.email,
                        products: this.cart,
                        address1: this.address1,
                        address2: this.address2,
                        city: this.city,
                        province: this.province,
                        postalcode: this.postalcode,
                        ccNumber: this.ccNumber,
                        cardBearer: this.cardBearer,
                        cvv: this.cvv,
                        saveAddress: this.saveAddress,
                        savePayment: this.savePayment,
                        jwtPresent: this.jwtPresent
                    }).then((response) => {
                        let id = response.data.id;
                        localStorage.removeItem('cart');
                        this.$router.push({path: `/checkout/${id}/complete`});
                    }, (error) => {
                        console.log(error);
                    });
                }
            },
            next() {
                this.$refs.carousel.next();
            }
        }
    }
</script>