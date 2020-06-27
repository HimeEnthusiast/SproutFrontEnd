<template style="height: 100%;">
    <div id="whole">
        <div id="nav">
            <Navbar :key="$route.fullPath"></Navbar>
        </div>

        <div id="mobile-nav">
            <MobileNavbar :key="$route.fullPath"></MobileNavbar>
        </div>

        <div id="container">
            <router-view :key="reset" @emptyCart="reset = reset + 1"></router-view>
        </div>
    </div>
</template>

<style scoped>
     #whole {
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        position: absolute;
     }

     #nav {
        top: 0;
        height: 100.8px;
        position: relative;
        z-index: 1;
     }

     #container {
        position: relative;
        width: 100%;
     }

     #mobile-nav {
         display: none;
     }

    @media (max-width:500px)  {
        #nav {
            display: none;
        }

        #mobile-nav {
            display: initial;
        }

        #container {
            height: 100%;
        }
    }
</style>

<script>
    import Navbar from './components/GlobalComponents/Navbar';
    import MobileNavbar from './components/GlobalComponents/MobileNav'

    export default {
        name: 'App',
        components: {
            Navbar,
            MobileNavbar
        },
        data() {
            return {
                reset: 0
            }
        }
    }
</script>