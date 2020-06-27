<template>
    <div id="root">
        <div id="top">
            <span id="order-num">Order #{{orderNum}}</span>
            <span id="order-datetime">Ordered on {{date}} - {{time}}</span>
        </div>
        <div id="address">
            <h3 id="title">Shipping Address</h3>
            <span class="address-line">{{address.line1}}</span>
            <span class="address-line" v-if="line2">{{address.line2}}</span>
            <span class="address-line">{{address.city}}, {{address.province}}</span>
            <span class="address-line">{{address.postal}}</span>
        </div>
        <div id="products">
            <div id="product-item" v-for="product in products" :key="product.id">
                <span id="product-name">{{product.name}}</span>
                <span id="product-price">${{product.price.toFixed(2)}}</span>
            </div>
        </div>
        <div id="bottom">
            <span id="total-title">Total Cost:</span>
            <span id="total-cost">${{totalCost.toFixed(2)}}</span>
        </div>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root {
        margin: 3%;
        font-family: 'Quicksand', sans-serif;
    }

    #top {
        display: flex;
        flex-direction: column;
    }

    #order-num {
        font-size: 200%;
        font-weight: bolder;
        color: #00A896;
    }

    #order-datetime {
        margin-top: 15px;
    }

    #address {
        display: flex;
        flex-direction: column;
        width: 230px;
        padding: 25px;
        border-radius: 10px;
        box-shadow: 0 1px 5px #0000004a;
        justify-self: center;
        margin-bottom: 30px;
        margin-top: 45px;
    }

    #title {
        margin: 0;
        padding: 5px;
    }

    .address-line {
        padding: 5px;
    }

    #products {
        padding-top: 10px;
    }

    #product-item {
        box-shadow: 0 3px 5px #0000007a;
        padding: 2%;
        border-radius: 10px;
        margin: 25px 0 25px 0;
        display: flex;
    }

    #product-name {
        font-size: 130%;
        color: #00A896;
    }

    #product-price {
        margin: auto 0 auto auto;
        font-size: 110%;
    }

    #bottom {
        display: flex;
        padding: 20px 40px 0 40px;
        font-weight: bold;
    }

    #total-title {
        font-size: 200%;
    }

    #total-cost {
        font-size: 200%;
        margin-left: auto;
    }

    @media (max-width:500px)  {
        #root {
            margin: 15px;
            margin-top: 70px;
        }

        #order-num {
            font-size: 33px;
        }

        #order-datetime {
            margin-top: 10px;
        }

        #address {
            margin: 40px auto 20px auto;
        }

        .address-line {
            padding: 3px;
        }

        #products {
            padding-top: 10px;
        }

        #product-item {
            padding: 13px;
        }

        #bottom {
            display: flex;
            padding: 20px 40px 0 40px;
            font-weight: bold;
        }

        #total-cost {
            font-weight: normal;
        }
    }
</style>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                orderNum: this.$route.params.id,
                date: "0000-00-00",
                time: "00:00:00",
                totalCost: 0.0,
                address: {
                    line1: "1 Street St.",
                    line2: "#5",
                    city: "City",
                    province: "Province",
                    postal: "A1B 2C3"
                },
                products: []
            }
        },
        mounted() {
            this.getInvoice();
        },
        methods: {
            getInvoice() {
                const url = process.env.VUE_APP_DOMAIN_NAME_AUTH;

                axios.get(url + "/get-invoice/" + this.$route.params.id)
                .then((response) => {
                    this.date = response.data.date;
                    this.time = response.data.time;
                    this.totalCost = response.data.totalCost;
                    this.address.line1 = response.data.address.lineOne;
                    this.address.line2 = response.data.address.lineTwo;
                    this.address.city = response.data.address.city;
                    this.address.province = response.data.address.province;
                    this.address.postal = response.data.address.postalCode;

                    response.data.products.forEach(element => {
                        this.products.push(element);
                    });
                });
            }
        }
    }
</script>