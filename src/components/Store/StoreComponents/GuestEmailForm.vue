<template>
    <div id="root">
        <fieldset id="email-form">
            <span class="input-title">Email: </span>
            <input type="email" id="email" v-model="email" required />
        </fieldset>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root {
        font-family: 'Quicksand', sans-serif;
        margin: 1%;
    }

    #email-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border: none;
    }

    input, select {
        margin-bottom: 2%;
        margin-top: 1%;
        padding: 2%;
        width: 40vh;
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