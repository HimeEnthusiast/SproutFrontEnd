<template>
    <div id="root">
        <div id="email-container">
            <fieldset id="email-form">
                <span class="input-title">Email: </span>
                <input type="email" id="email" v-model="email" required />
                <span class="error-line" v-if="emailError">Please enter a valid email.</span>
            </fieldset>
        </div>

        <div id="submit-container">
            <!-- <input type="submit" id="order-button" value="Complete Order" /> -->
            <button type="button" id="order-button" @click="emailComplete()">Complete Order</button>
        </div>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root {
        font-family: 'Quicksand', sans-serif;
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
                let email = document.getElementById("email");

                if(!email.checkValidity()) {
                    alert(email.value);
                    this.emailError = true; 
                    email.style.borderColor = "rgb(240, 0, 0)";
                } else {
                    this.emailError = false;
                    email.style.borderColor = "rgb(206, 206, 206)";
                    this.$emit('formComplete', 1);
                }
            }
        }
    }
</script>