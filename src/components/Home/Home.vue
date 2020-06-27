<template>
    <div id="container">
        <Slideshow id="slideshow"></Slideshow>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #container {
        font-family: 'Quicksand', sans-serif;
        position: fixed;
        height: 100%;
        width: 100%;
        z-index: -1;
    }

    @media (max-width:500px)  {
        #slideshow {
            /* width: 90%; */
        }
    }
</style>

<script>
    import Slideshow from './HomeComponents/Slideshow'

    export default {
        name: "Home",
        components: {
            Slideshow
        }
    }
</script>