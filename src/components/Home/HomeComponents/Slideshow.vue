<template>
    <div id="root">
        <VueSlickCarousel id="slideshow" v-bind="settings">
            <div id="slide">
                <h1 class="slide-title">New seeds in stock!</h1>
                <img class="slide-img" src="https://images.unsplash.com/photo-1457530378978-8bac673b8062?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
            </div>

            <div id="slide">
                <h1 class="slide-title">Plant a tree today.</h1>
                <img class="slide-img" src="https://images.unsplash.com/photo-1500683401647-ff9f9781d5c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80p">
            </div>

            <div id="slide">
                <h1 class="slide-title">Browse our wide selection of flowers!</h1>
                <img class="slide-img" src="https://images.unsplash.com/photo-1534301935032-8f808f3e5f08?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80">
            </div>
        </VueSlickCarousel>
    </div>
</template>

<style scoped>
    #slideshow {
        /* padding: 15px 15px 0 15px; */
        max-width: 100vw;
        padding: 0;
        /* max-height: 50vh; */
    }

    .slide-title {
        position: absolute;
        bottom: 0;
        color: #ffffff;
        text-shadow: 0 3px 5px #000000;
        padding: 20px 20px 25px 20px;
        margin: 0;
        font-size: 5vw;
    }

    .slide-img {
        width: 100%;
        max-height: 70vh;
        min-width: 100vw;
        object-fit: cover;
        margin-bottom: 15px;
    }

    @media (max-width:500px)  {
        #slideshow {
            max-width: 100vw;
            padding: 0;
        }

        .slide-title {
            font-size: 10vw;
        }

        .slide-img {
            min-height: 50vh;
            border-radius: 0;
            object-fit: cover;
            margin-bottom: 5px;
        }
    }
</style>

<script>
    import VueSlickCarousel from 'vue-slick-carousel';
    import 'vue-slick-carousel/dist/vue-slick-carousel.css';
    import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

    export default {
        name: "Slideshow",
        components: {
            VueSlickCarousel
        },
        data() {
            return {
                titles: [
                    "New seeds in stock.",
                    "Browse our wide arrange of flowers.",
                    "Plant a tree today."
                ],
                settings: {
                    "arrows": false,
                    "dots": true,
                    "infinite": true,
                    "slidesToShow": 1,
                    "slidesToScroll": 1,
                    "fade": true,
                    "autoplay": true,
                    "speed": 2000,
                    "autoplaySpeed": 6000,
                    "cssEase": "linear",
                }
            };
        },
        mounted: function() {
            this.startSlide();
        },
        methods: {
            startSlide: function() {
                this.timer = setInterval(this.next, 6500);
            },
            next: function() {
                this.currentIndex += 1;
            }
        },
        computed: {
            currentImg: function() {
                return this.images[Math.abs(this.currentIndex) % this.images.length];
            },
            currentTitle: function() {
                return this.titles[Math.abs(this.currentIndex) % this.titles.length];
            }
        }
    };
</script>