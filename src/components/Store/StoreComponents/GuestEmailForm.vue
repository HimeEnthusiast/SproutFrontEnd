<template>
    <div id="root">
        <div id="email-container">
            <fieldset id="email-form">
                <span class="input-title">Email: </span>
                <input type="email" id="email-input" ref="email-line" v-model="email" required />
                <span class="error-line" v-if="emailError">Please enter a valid email.</span>
            </fieldset>
        </div>

        <div id="submit-container">
            <button type="button" id="order-button" @click="emailComplete()">Complete Order</button>
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

    #email-container {
        display: flex;
        justify-content: center;
    }

    #email-form {
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

    .input-title {
        margin: 3% 0 0 0;
    }

    .error-line {
        font-size: 13px;
        color: rgb(240, 0, 0);
    }

    #submit-container {
        padding-top: 50px;
    }

    #order-button {
        display: block;
        font-family: 'Quicksand', sans-serif;
        position: absolute;
        margin: auto;
        padding: 15px 20px 15px 20px;
        font-weight: bolder;
        font-size: 17px;
        background-color: #00A896;
        border: none;
        color: #ffffff;
        border-radius: 5px;
        bottom: 50%;
        left: 0;
        right: 0;
    }

    #order-button:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 2px #0000007a;
        transition: 0.3s;
        cursor: pointer;
    }

    @media (max-width:690px)  {
        input, select {
            width: 65vw;
        }
    }
</style>

<script>
    export default {
        name: "guestEmailForm",
        data() {
            return {
                email: "",
                emailError: false
            }
        },
        watch: {
            email: function() {
                this.$emit('email', this.email);
            }
        },
        methods: {
            emailComplete() {
                let emailInput = this.$refs["email-line"];

                if(!emailInput.checkValidity()) {
                    console.log(this.email);
                    this.emailError = true; 
                    emailInput.style.borderColor = "rgb(240, 0, 0)";
                } else {
                    this.emailError = false;
                    emailInput.style.borderColor = "rgb(206, 206, 206)";
                    this.$emit('formComplete', 1);
                }
            }
        }
    }
</script>