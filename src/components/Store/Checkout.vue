<template>
    <div id="root">
        <div id="loader">
            <img id="loading-icon" src="../../assets/spinner.svg">
        </div>

        <form id="forms" @submit.prevent="sendData()">
            <div id="left">
                <AddressForm @address1="address1 = $event" 
                            @address2="address2 = $event"
                            @city="city = $event"
                            @province="province = $event"
                            @postalcode="postalcode = $event"
                            @saveAddress="saveAddress = $event"></AddressForm>
            </div>

            <div id="right">
                <PaymentForm @cardBearer="cardBearer = $event"
                            @ccNumber="ccNumber = $event"
                            @cvv="cvv = $event"
                            @savePayment="savePayment = $event">
                </PaymentForm>

                <GuestEmailForm v-if="!jwtPresent"
                            @email="email = $event">
                </GuestEmailForm>

                <input type="submit" id="order-button" value="Complete Order" />
            </div>
        </form>
    </div>
</template>

<style scoped>
    #forms {
        margin-top: 2%;
        display: flex;
        flex-direction: row;
        justify-content: center;
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
        width: 40%;
        margin-left: auto;
    }

    #right {
        width: 40%;
        position: relative;
    }

    #order-button {
        position: absolute;
        font-size: 200%;
        font-family: 'Quicksand', sans-serif;
        padding: 15px 25px 15px 25px;
        background-color: #00A896;
        border: none;
        font-weight: bolder;
        color: #ffffff;
        border-radius: 10px;
        bottom: 0;
        margin-left: 20px;
    }

    #order-button:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 2px #0000007a;
        transition: 0.3s;
        cursor: pointer;
    }
</style>

<script>
    import axios from 'axios';

    import AddressForm from "./StoreComponents/AddressForm";
    import PaymentForm from "./StoreComponents/PaymentForm";
    import GuestEmailForm from "./StoreComponents/GuestEmailForm";
    // import LoadingScreen from "../GlobalComponents/LoadingScreen";

    export default {
        name: "checkout",
        components: {
            AddressForm,
            PaymentForm,
            GuestEmailForm
            // LoadingScreen
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
                jwt: this.$cookies.get('jwt').replace(/"/g,"")
            }
        },
        mounted() {
            alert("Please Note: \n\nThis is a FAKE store, created only to showcase in my portfolio. There is nothing being sold. Make sure to not enter any real personal information when using this form, as it will be saved in a database.\n\nThank you!\n\n");
            // this.$store.commit('setLoadingStatus', false);

            if(localStorage.getItem('cart')) {
                this.cart = JSON.parse(localStorage.getItem('cart'));
            }
        },
        // computed: {
        //     isLoading() {
        //         return this.$store.getters.getLoadingStatus;
        //     }
        // },
        methods: {
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
            }
        }
    }
</script>