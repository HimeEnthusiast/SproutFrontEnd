<template>
    <div id="root">
        <div id="top">
            <span id="order-num">Order #{{orderNum}}</span>
            <span id="order-datetime">Ordered on {{date}} - {{time}}</span>
        </div>
        <div id="address">
            <h3 id="title">Shipping Address</h3>

            <div id="lines">
                <span class="address-line">{{address.line1}}</span>
                <span class="address-line" v-if="line2">{{address.line2}}</span>
                <span class="address-line">{{address.city}}, {{address.province}}</span>
                <span class="address-line">{{address.postal}}</span>
            </div>
        </div>
        <div id="products">
            <h3 id="title">Products</h3>
            <div id="product-item" v-for="product in products" :key="product.id">
                <span id="product-name">{{product.name}}</span>
                <span id="product-quantity">Quantity: {{product.quantity}}</span>
                <span id="product-price">${{product.price.toFixed(2)}}</span>
            </div>
        </div>
        <div id="bottom">
            <!-- <span id="total-title">Total Cost:</span> -->
            <span id="total-cost">Total Cost: ${{totalCost.toFixed(2)}}</span>
        </div>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root {
        /* margin: 3%; */
        padding: 30px;
        font-family: 'Quicksand', sans-serif;
        min-height: calc(100vh - 90px);
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
        justify-self: center;
        margin-bottom: 30px;
        margin-top: 45px;
    }

    #lines {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px;
    }

    #title {
        margin: 0;
        padding: 7px;
        background-color: #00A896;
        width: calc(100vw - 60px);
        color: #ffffff;
    }

    .address-line {
        padding: 5px;
    }

    #products {
        padding-top: 10px;
    }

    #product-item {
        padding: 10px;
        display: flex;
    }

    #product-name {
        font-size: 130%;
        color: #00A896;
    }

    #product-quantity {
        margin: auto 0 auto auto;
    }

    #product-price {
        margin: auto 0 auto 20px;
        font-size: 110%;
    }

    #bottom {
        display: flex;
        padding: 70px 40px 0 40px;
        font-weight: bold;
    }

    #total-cost {
        font-size: 200%;
        margin-left: auto;
    }

    @media (max-width:690px)  {
        #root {
            padding: 15px;
        }

        #order-num {
            font-size: 33px;
        }

        #order-datetime {
            margin-top: 10px;
        }

        #title {
            width: calc(100vw - 45px);
        }

        .address-line {
            padding: 3px;
        }

        #lines {
            padding: 5px;
        }

        #products {
            padding: 0;
        }

        #product-item {
            padding: 8px 8px 12px 8px;
        }

        #product-name {
            font-size: 15px;
            color: #000000;
            font-weight: bolder;
        }

        #product-quantity {
            font-size: 13px;
        }

        #product-price {
            font-size: 15px;
        }

        #bottom {
            margin-top: 20px;
            background-color: #00A896;
            color: #ffffff;
            font-weight: normal;
            padding: 5px;
        }

        #total-cost {
            font-size: 20px;
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
            deleteDupe(arr, obj) {
                console.log(arr + obj);
            },
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

                    response.data.products.forEach(x => {
                        x.quantity = 1;
                        this.products.push(x);

                    });

                    this.cleanArray();
                });
            },
            cleanArray() {
                this.products.sort();
                console.log(this.products);

                let lastId = 0;
                let currentId = 0;

                for(let i = 0; i < this.products.length; i++) {
                    lastId = this.products[i].id;
                    
                    for(let j = 1; i <this.products.length; j++) {
                        currentId = this.products[j].id;

                        if(lastId == currentId) {
                            this.products[i].quantity++;
                            this.products[i].price += this.products[i].price; 
                            this.products.splice(j, 1);
                        }
                    }
                }
            }
        }
    }
</script>