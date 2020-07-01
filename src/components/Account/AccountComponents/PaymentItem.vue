<template>
    <div id="root">
        <EditPaymentPopup id="payment-popup" :isEdit="edit" :key="reset" @done="refresh()" @clicked="closeWindow()" :cardBearer="cardBearer" :ccNumber="cardNumber" :paymentId="paymentId"></EditPaymentPopup>

        <h1 id="title">Your Payment Methods</h1>
        <button id="add-title-button" @click="openPaymentPopup(false)">
            <h3 id="add-title">+ Add Card</h3>
        </button>

        <div id="card-grid">
            <div id="card" v-for="card in cards" :key="card.id"> <!-- This div gets repeated -->
                <div id="payment-lines">
                    <span class="line">{{card.cardBearer}}</span>
                    <span class="line">{{card.cardNumber}}</span>
                    <span class="line">***</span>
                </div>

                <div id="buttons">
                    <button id="edit-button" @click="openPaymentPopup(true, card.id, card.cardBearer, card.cardNumber, card.cvv)">
                        <svg
                            id="edit-icon" 
                            aria-hidden="true" 
                            focusable="false" 
                            data-prefix="fas" 
                            data-icon="pen" 
                            class="svg-inline--fa fa-pen fa-w-16" 
                            role="img" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 512 512">
                                <path 
                                    d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                                </path>
                        </svg>
                    </button>

                    <button id="delete-button" @click="deletePayment(card.id)">
                        <svg 
                            id="delete-icon"
                            aria-hidden="true" 
                            focusable="false" 
                            data-prefix="fas" 
                            data-icon="trash" 
                            class="svg-inline--fa fa-trash fa-w-14" 
                            role="img" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 448 512">
                                <path 
                                    d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z">
                                </path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root {
        font-family: 'Quicksand', sans-serif;
        display: flex;
        flex-direction: column;
    }

    #title {
        margin-bottom: 0;
    }

    #add-title-button {
        border: none;
        background-color: #00A896;
        width: 150px;
        min-width: 140px;
        margin: 10px 0 20px 0;
        border-radius: 10px;
        padding-left: 0;
    }

    #add-title {
        margin: 12px;
        color: #ffffff;
        font-family: 'Quicksand', sans-serif;
    }

    #add-title-button:hover {
        cursor: pointer;
    }

    #card-grid {
        width: 100vw;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 300px));
    }

    #card {
        display: flex;
        width: 230px;
        padding: 25px;
        border-radius: 10px;
        box-shadow: 0 1px 5px #0000004a;
        justify-self: center;
        align-items: center;
        margin-bottom: 30px;
    }

    #payment-lines {
        display: flex;
        flex-direction: column;
        width: 70%;
    }

    .line {
        margin-bottom: 6px;
    }

    #buttons {
        width: 30%;
        text-align: right;
        fill: #ffffff;
    }

    #edit-button, #delete-button {
        width: 50px;
        height: 50px;
        border-radius: 7px;
        border: none;
    }

    #edit-button {
        margin-bottom: 20px;
        background-color: #00A896;
    }

    #delete-button {
        background-color: #b90047;
    }

    #edit-icon, #delete-icon {
        width: 60%;
    }

    #edit-button:hover, #delete-button:hover {
        cursor: pointer;
        scale: 1.1;
        transition: 0.3s;
    }

    @media (max-width:690px)  {
        #card-grid {
            width: 100%;
        }
    }

    @media (max-width:500px)  {
        #title {
            font-size: 30px;
        }

        #add-title-button {
            width: 0px;
            padding: 0;
        }

        #add-title {
            font-size: 14px;
        }

        #card-grid {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 250px));
        }

        #card {
            width: 200px;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }

        .line {
            margin-bottom: 4px;
        }

        #edit-button, #delete-button {
            width: 40px;
            height: 40px;
        }

        #edit-button {
            margin-bottom: 10px;
        }

        #edit-icon, #delete-icon {
            width: 70%;
        }
    }
</style>

<script>
    import EditPaymentPopup from './EditPaymentPopup';
    import axios from 'axios';

    export default {
        name: 'AddressItem',
        components: {
            EditPaymentPopup
        },
        data() {
            return {
                edit: true,
                reset: 0,
                cardBearer: "",
                cardNumber: "",
                cvv: "",
                id: this.$store.getters.getUserId,
                jwt: this.$cookies.get('jwt').replace(/"/g,""),
                cards: [],
                paymentId: 0
            }
        },
        created() {
            this.getPayments();
        },
        mounted() {
            document.getElementById("payment-popup").style.display = "none";
        },
        watch: {
            edit: function() {
                this.reset = this.reset + 1;
            },
            cardNumber: function() {
                this.reset = this.reset + 1;
            }
        },
        methods: {
            openPaymentPopup(isEdit, paymentId, cardBearer, cardNumber, cvv) {
                document.getElementById("payment-popup").style.display = "initial";
                this.edit = isEdit;
                this.paymentId = paymentId;
                this.cardBearer = cardBearer;
                this.cardNumber = cardNumber;
                this.cvv = cvv;

                // Get the current page scroll position 
                let scrollTop =  window.pageYOffset || document.documentElement.scrollTop; 
                let scrollLeft =  window.pageXOffset || document.documentElement.scrollLeft; 

                window.onscroll = function() { 
                    window.scrollTo(scrollLeft, scrollTop); 
                }; 
            },
            closeWindow() {
                document.getElementById("payment-popup").style.display = "none";

                window.onscroll = function() {};
            },
            getPayments() {
                const url = process.env.VUE_APP_DOMAIN_NAME_AUTH;

                axios.get(url + "/user/" + this.id, {
                    headers: {
                        'Authorization': 'Bearer ' + this.jwt
                    }
                }).then((response) => {
                    let paymentResponse = [];

                    response.data.cardInformation.forEach(element => {
                        paymentResponse.push(element);
                    });

                    this.cards = paymentResponse;
                });
            },
            deletePayment(paymentId) {
                const url = process.env.VUE_APP_DOMAIN_NAME_AUTH;

                axios.post(url + "/delete-payment/" + paymentId, {
                    id: paymentId
                },
                {
                    headers: {
                        'Authorization': 'Bearer ' + this.jwt
                    }
                }).then((response) => {
                    console.log(response.data);
                });

                this.getPayments();
                this.$emit('delete', 1);
            },
            refresh() {
                this.closeWindow();
                this.$emit('delete', 1);
            }
        }
    }
</script>