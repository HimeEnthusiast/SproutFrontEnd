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

        <button type="button" class="custom-arrow" @click="paymentComplete()">
            >
        </button>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root {
        font-family: 'Quicksand', sans-serif;
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
                cvvError: false
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