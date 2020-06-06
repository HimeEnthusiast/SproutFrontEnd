<template>
    <div id="root">
        <h1>Thank you!</h1>
        <span id="text">Your order is now complete.</span>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root {
        font-family: 'Quicksand', sans-serif;
        display: flex;
        flex-direction: column;
        text-align: center;
    }

    h1 {
        font-size: 600%;
        color: #00A896;
    }

    #text {
        font-size: 150%;
    }
</style>

<script>
export default {
    name: "ThankYou"
}
</script>