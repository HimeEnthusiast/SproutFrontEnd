<template>
    <div id="root">
        <div id="email-container">
            <fieldset id="email-form">
                <span class="input-title">Email: </span>
                <input type="email" id="email" v-model="email" required />
            </fieldset>
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
                email: ""
            }
        },
        watch: {
            email: function() {
                this.$emit('email', this.email);
            }
        }
    }
</script>