<template>
    <VueSlickCarousel ref="carousel">
        <div id="address">
            <AddressForm @address1="address1 = $event" 
                        @address2="address2 = $event"
                        @city="city = $event"
                        @province="province = $event"
                        @postalcode="postalcode = $event"
                        @saveAddress="saveAddress = $event">
            </AddressForm>

            <button type="button" class="custom-arrow" @click="showNext()">
                >
            </button>
        </div>

        <div id="payment">
            <PaymentForm @cardBearer="cardBearer = $event"
                        @ccNumber="ccNumber = $event"
                        @cvv="cvv = $event"
                        @savePayment="savePayment = $event">
            </PaymentForm>

            <button type="button" class="custom-arrow" @click="showNext()">
                >
            </button>
            <button type="button" class="custom-arrow" @click="showPrev()">
                &#60;
            </button>
        </div>

        <div id="guest-email">
            <GuestEmailForm v-if="!jwtPresent"
                @email="email = $event">
            </GuestEmailForm>

            <button type="button" class="custom-arrow" @click="showPrev()">
                &#60;
            </button>

            <div id="submit-container">
                <input type="submit" id="order-button" value="Complete Order" />
            </div>
        </div>
    </VueSlickCarousel>
</template>

<style scoped>

</style>

<script>
    import AddressForm from "./AddressForm";
    import PaymentForm from "./PaymentForm";
    import GuestEmailForm from "./GuestEmailForm";
    import VueSlickCarousel from 'vue-slick-carousel';
    import 'vue-slick-carousel/dist/vue-slick-carousel.css';
    import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

    export default {
        components: {
            AddressForm,
            PaymentForm,
            GuestEmailForm,
            VueSlickCarousel
        },
        methods: {
            showNext() {
                this.$refs.carousel.next();
            },
            showPrev() {
                this.$refs.carousel.prev();
            }
        }
    }
</script>