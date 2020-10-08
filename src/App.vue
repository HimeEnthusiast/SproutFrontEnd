<template>
    <div id="whole">
        <div id="nav">
            <Navbar :key="$route.fullPath"></Navbar>
        </div>

        <div id="mobile-nav">
            <MobileNavbar :key="$route.fullPath"></MobileNavbar>
        </div>

        <!-- <vuescroll :ops="ops"> -->
            <div id="whole-container">
                <div id="container">
                    <router-view :key="reset" @emptyCart="reset = reset + 1"></router-view>
                </div>

                <div id="footer">
                    <Footer></Footer>
                </div>
            </div>
    </div>
</template>

<style scoped>
    #whole-container {
        position: relative;
    }

    #nav {
        display: block;
        position: fixed;
        width: calc(100vw - 17px);
        z-index: 1;
    }

    #container {
        padding-top: 91px;
    }

    #mobile-nav {
        display: none;
        z-index: 1;
    }

    #footer {
        position: absolute;
        bottom: 0;
    }

    @media (max-width:690px)  {
        #nav {
            display: none;
        }

        #mobile-nav {
            display: block;
            position: fixed;
            width: 100vw;
        }

        #container {
            padding-top: 60px;
        }
    }
</style>

<script>
    import Navbar from './components/GlobalComponents/Navbar';
    import MobileNavbar from './components/GlobalComponents/MobileNav';
    import Footer from './components/GlobalComponents/Footer';

    export default {
        name: 'App',
        components: {
            Navbar,
            MobileNavbar,
            Footer
        },
        data() {
            return {
                reset: 0
                }
        }
    }
</script>