<template>
    <div id="root">
        <div id="banner">
            <p id="banner-title">Register for a new account.</p>
            <p id="banner-blurb">This will allow you to save your orders to look at later, as well as saving order information for faster checkout!</p>
            
            <svg id="sprout-svg" viewBox="0 0 512 512.00034" xmlns="http://www.w3.org/2000/svg">
                <path d="m437.09375 201.09375c48.304688-48.304688 74.90625-112.53125 74.90625-180.84375v-.25c0-11.046875-8.953125-20-20-20h-.25c-68.3125 0-132.539062 26.601562-180.84375 74.90625-23.742188 23.746094-42.230469 51.34375-54.90625 81.378906-12.675781-30.035156-31.160156-57.632812-54.90625-81.378906-48.304688-48.304688-112.53125-74.90625-180.84375-74.90625h-.25c-11.046875 0-20 8.953125-20 20v.25c0 68.3125 26.601562 132.539062 74.90625 180.84375 43.621094 43.621094 100.222656 69.535156 161.09375 74.152344v121.242187c-79.785156 3.734375-159.15625 29.9375-227.679688 79.28125-8.964843 6.453125-10.996093 18.953125-4.542968 27.914063 3.910156 5.429687 10.035156 8.316406 16.246094 8.316406 4.085937 0 229.703124-169.8125 460.28125-3.769531 8.964843 6.453125 21.460937 4.417969 27.914062-4.542969 6.457031-8.964844 4.421875-21.464844-4.539062-27.917969-64.957032-46.773437-143.511719-75.339843-227.679688-79.28125v-121.242187c60.871094-4.617188 117.472656-30.53125 161.09375-74.152344zm-97.902344-97.902344c35.824219-35.824218 82.027344-57.5 131.832032-62.214844-4.714844 49.804688-26.390626 96.007813-62.214844 131.832032-35.824219 35.824218-82.03125 57.5-131.832032 62.214844 4.714844-49.800782 26.390626-96.007813 62.214844-131.832032zm-236 69.617188c-35.824218-35.824219-57.5-82.03125-62.214844-131.832032 49.800782 4.714844 96.007813 26.390626 131.832032 62.214844 35.824218 35.824219 57.5 82.03125 62.214844 131.832032-49.800782-4.714844-96.007813-26.390626-131.832032-62.214844zm0 0"/>
            </svg>
        </div>
        <div id="registration">
            <form id="reg-form" @submit.prevent="registerUser" method="post">
                <p class="input-title">First Name:</p>
                <input type="text" v-model="firstName" placeholder="Jane" minlength="1" maxlength="50" required/>

                <p class="input-title">Last Name:</p>
                <input type="text" v-model="lastName" placeholder="Doe" minlength="1" maxlength="50" required/>

                <p class="input-title">Email:</p>
                <input type="email" v-model="email" placeholder="example@mail.com" required/>
                <span class="error" id="email-error" v-if="emailError">Email is already in use.</span>

                <p class="input-title">Password:</p>
                <input ref="password" type="password" v-model="password" minlength="6" maxlength="50" required/>

                <p class="input-title">Confirm Password:</p>
                <input ref="password-confirm" type="password" name="confirm-password" required/>
                <span class="error" id="password-confirm-error" v-if="passwordConfirmError">Passwords do not match.</span>

                <input id="submit-button" type="submit" value="Register" />
            </form>
        </div>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand:700|Raleway&display=swap');

    input {
        margin-bottom: 2%;
        margin-top: 1%;
        padding: 3%;
        width: 40vh;
        border-radius: 5px;
        font-family: 'Raleway', sans-serif;
        border: 1px solid rgb(206, 206, 206);
    }

    .input-title {
        margin: 3% 0 0 0;
    }

    .error {
        color: rgb(228, 0, 49);
        font-size: 15px;
        text-align: center;
    }

    #root {
        font-family: 'Quicksand', sans-serif;
        height: calc(100vh - 90px);
        padding-bottom: 40px;
        display: flex;
        flex-direction: row;
    }

    #banner-title {
        padding: 30px;
        margin: 2% 0 0 0;
        font-size: 50px;
        font-weight: bolder;
        color: #ffffff;
    }

    #banner-blurb {
        padding: 0 30px 30px 30px;
        margin: 0;
        font-size: 20px;
        color: #ffffff;
        font-family: 'Raleway', sans-serif;
    }

    #banner {
        background-color: #00A896;
        height: 100%;
        width: 30%;
        min-width: 300px;
        z-index: -100;
        overflow: hidden;
        position: relative;
    }

    #sprout-svg {
        fill: white;
        width: 60%;
        display: block;
        margin: auto;
        position: absolute;
        bottom: 0;
        left: 0;
        top: 0;
        right: 0;
        margin-bottom: -20px;
    }

    #registration {
        display: flex;
        float: right;
        justify-content: center;
        align-items: center;
        width: 70%;
    }

    #reg-form {
        display: flex;
        flex-direction: column;
        color: #00A896;
        font-size: 20px;
    }

    #submit-button {
        padding: 10px;
        align-self: center;
        width: 20vw;
        font-size: 20px;
        background-color: #00A896;
        border: none;
        font-family: 'Quicksand', sans-serif;
        font-weight: bolder;
        color: #ffffff;
        margin-top: 10%;
    }

    #submit-button:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 2px #0000007a;
        transition: 0.3s;
    }

    @media (max-width:690px)  {
        button {
            outline: none;
        }
        
        input {
            margin: 0;
            padding: 10px;
            width: calc(100% - 20px);
        }

        .input-title {
            margin: 15px 0 3px 5px;
        }

        .error {
            font-size: 12px;
        }

        #root {
            height: 100%;
            flex-direction: column;
        }

        #banner-title {
            padding: 0;
            margin-top: 70px;
            margin-left: 15px;
            font-size: 30px;
        }

        #banner-blurb {
            padding: 0;
            margin-top: 15px;
            margin-left: 15px;
            font-size: 15px;
            width: 60%;
        }

        #banner {
            height: 200px;
            width: 100%;
        }

        #sprout-svg {
            max-width: 120px;
            min-width: 100;
            width: 20%;
            margin: auto 8px -10px auto;
        }

        #registration {
            width: 80%;
            margin: 0 auto 0 auto;
        }

        #reg-form {
            font-size: 17px;
            width: 100%;
        }

        #submit-button {
            width: 100%;
            margin-top: 30px;
        }
    }
</style>

<script>
    import axios from 'axios';

    export default {
        name: "Register",
        data() {
            return {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                emailError: false,
                passwordError: false,
                passwordConfirmError: false
            }
        },
        methods: {
            registerUser: function() {
                

                let pwInput = this.$refs["password"];
                let pwConfirm = this.$refs["password-confirm"];

                if(pwInput.value != pwConfirm.value) {
                    this.passwordConfirmError = true;
                } else {
                    const url = process.env.VUE_APP_DOMAIN_NAME_AUTH;

                    axios.post(url + "/register", {
                        username: this.email,
                        password: this.password,
                        firstName: this.firstName,
                        lastName: this.lastName,
                    }).then((response) => {
                        console.log(response.data);
                        this.$router.push("/login");
                    }, (error) => {
                        console.error(error);

                        if(error.response.status == 409) {
                            this.emailError = true;
                        };
                    });
                }
            }
        }
    }
</script>