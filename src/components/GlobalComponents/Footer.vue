<template>
    <div id="root">
        <span class="line">
            By Isabella Piantoni
        </span>
        <span class="line">
            F.A.Q.
        </span>
        <span class="line">
            Contact Us
        </span>
    </div>    
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root {
        font-family: 'Quicksand', sans-serif;
        background-color: #B2EDE0;
        width: calc(100vw - 20px);
        padding: 10px;
        color: #00A896;
        display: flex;
        justify-content: center;
        /* margin-top: -98px; */
    }

    .line {
        margin: 0 15px 0 15px;
    }

    @media (max-width:690px)  {
        .line {
            margin: 0 14px 0 14px;
        }
    }
</style>

<script>
    export default {
        
    }
</script>