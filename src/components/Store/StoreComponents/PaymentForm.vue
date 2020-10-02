<template>
    <div id="root">
        <div id="payment-container">
            <fieldset id="payment-form">
                <span class="input-title">Name: </span>
                <input type="text" id="name" v-model="cardBearer" minlength="1" maxlength="50" required />
                <span class="error-line" v-if="nameError">Please enter a name.</span>

                <span class="input-title">Credit Card Number: </span>
                <input type="text" id="ccnumber" v-model="ccNumber" minlength="16" maxlength="19" required />
                <span class="error-line" v-if="ccNumberError">Please enter a valid credit card number.</span>

                <span class="input-title">CVV: </span>
                <input type="password" id="cvv" v-model="cvv" minlength="3" maxlength="3" required />
                <span class="error-line" v-if="cvvError">Please enter a valid CVV.</span>

                <span id="save-check-container" v-if="jwtExists()"> <!-- v-if logged in -->
                    <input id="save-check" type="checkbox" v-model="savePayment" /> Save this payment method?
                </span>
            </fieldset>
        </div>

        <button type="button" class="custom-arrow" v-if="!jwtPresent" @click="paymentComplete()">
                <svg 
                    id="next-arrow"
                    aria-hidden="true" 
                    focusable="false" 
                    data-prefix="fas" 
                    data-icon="arrow-right" 
                    class="svg-inline--fa fa-arrow-right fa-w-14" 
                    role="img" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 448 512">
                        <path 
                            d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z">
                        </path>
                </svg>
        </button>

        <div id="submit-container" v-if="jwtPresent">
            <button type="button" id="order-button" @click="paymentComplete()">Complete Order</button>
        </div>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root {
        font-family: 'Quicksand', sans-serif;
        padding: 10px;
        height: 60vh;
        position: relative;
    }

    #payment-container {
        display: flex;
        justify-content: center;
    }

    #payment-form {
        display: flex;
        flex-direction: column;
        border: none;
    }

    input, select {
        margin-bottom: 2%;
        margin-top: 1%;
        padding: 10px;
        width: 30vw;
        border-radius: 5px;
        font-family: 'Raleway', sans-serif;
        border: 1px solid rgb(206, 206, 206);
    }

    #save-check {
        width: 20px;
    }

    .input-title {
        margin: 3% 0 0 0;
    }

    .error-line {
        font-size: 13px;
        color: rgb(240, 0, 0);
    }

    .custom-arrow {
        display: block;
        position: absolute;
        padding: 5px;
        width: 70px;
        background-color: #00A896;
        border: none;
        fill: #ffffff;
        border-radius: 5px;
        bottom: 0;
        right: 0;
        margin-bottom: 30px;
        margin-right: 10px;
    }

    .custom-arrow:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 2px #0000007a;
        transition: 0.3s;
        cursor: pointer;
    }

    #button-text {
        font-size: 20px;
    }

    #next-arrow {
        height: 25px;
    }

    @media (max-width:690px)  {
        #root {
            margin-bottom: 25px;
        }
        
        input, select {
            width: 65vw;
        }
    }
</style>

<script>
    export default {
        name: "PaymentForm",
        data() {
            return {
                cardBearer: "",
                ccNumber: "",
                cvv: "",
                savePayment: false,
                nameError: false,
                ccNumberError: false,
                cvvError: false,
                jwtPresent: this.$store.getters.getAuthentication
            }
        },
        watch: {
            cardBearer: function() {
                this.$emit('cardBearer', this.cardBearer);
            },
            ccNumber: function() {
                this.$emit('ccNumber', this.ccNumber);
            },
            cvv: function() {
                this.$emit('cvv', this.cvv);
            },
            savePayment: function() {
                this.$emit('savePayment', this.savePayment);
            }
        },
        methods: {
            jwtExists: function() {
                let jwt = false;

                if(this.$cookies.get('jwt')) {
                    jwt = true;
                }

                return jwt;
            },
            paymentComplete() {
                let name = document.getElementById("name");
                let ccNumber = document.getElementById("ccnumber");
                let cvv = document.getElementById("cvv");

                if(!name.checkValidity()) {
                    this.nameError = true;
                    name.style.borderColor = "rgb(240, 0, 0)";
                } else {
                    this.nameError = false;
                    name.style.borderColor = "rgb(206, 206, 206)";
                }
                
                if (!ccNumber.checkValidity()) {
                    this.ccNumberError = true;
                    ccNumber.style.borderColor = "rgb(240, 0, 0)";
                } else {
                    this.ccNumberError = false;
                    ccNumber.style.borderColor = "rgb(206, 206, 206)";
                }
                
                if (!cvv.checkValidity()) {
                    this.cvvError = true;
                    cvv.style.borderColor = "rgb(240, 0, 0)";
                } else {
                    this.cvvError = false;
                    cvv.style.borderColor = "rgb(206, 206, 206)";
                } 
                

                if(name.checkValidity() && ccNumber.checkValidity() && cvv.checkValidity()) {
                    this.$emit('formComplete', 1);
                }
            }
        }
    }
</script>