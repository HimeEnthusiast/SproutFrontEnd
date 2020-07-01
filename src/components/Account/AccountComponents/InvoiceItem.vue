<template>
    <div id="root">
        <h1 id="title">Order History</h1>
        <div id="product-info" v-for="invoice in invoices" :key="invoice.id">
            <span id="datetime">{{invoice.date}} - {{invoice.time}}</span>
            <span id="quantity">Items: {{invoice.products.length}}</span>
            <span id="price">Total: ${{invoice.totalCost.toFixed(2)}}</span>
            
            <router-link class="router-link" :to="{name: 'invoice', params: { id: invoice.id }}">
                <button id="view-order">View Order</button>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
    #root {
        display: flex;
        flex-direction: column;
        width: 50vw;
    }

    #product-info {
        display: flex;
        box-shadow: 0 3px 5px #0000007a;
        width: 90%;
        flex-direction: row;
        padding: 25px;
        border-radius: 10px;
        margin: 15px;
        margin-left: 0;
    }

    #title {
        margin-bottom: 0;
    }

    #datetime {
        margin: auto;
        margin-left: 0;
    }

    #price {
        margin: auto 15px auto 20px;
    }

    #quantity {
        margin: auto;
        margin-right: 0;
    }

    #view-order {
        font-family: 'Quicksand', sans-serif;
        align-self: start;
        background-color: #00A896;
        border: none;
        font-weight: bolder;
        color: #ffffff;
        border-radius: 7px;
        padding: 10px 15px 10px 15px;
        font-size: 130%;
    }

    #view-order:hover {
        scale: 1.1;
        box-shadow: 0 2px 2px #0000007a;
        transition: 0.3s;
        cursor: pointer;
    }

    @media (max-width:650px)  {
        #product-info {
            width: 90%;
            padding: 15px;
            border-radius: 10px;
            margin: 0;
            margin-bottom: 20px;
        }

        #title {
            margin-bottom: 20px;
            font-size: 30px;
        }

        #datetime {
            font-size: 2.7vw;
            width: 70px;
        }

        #price {
            font-size: 3vw;
        }

        #quantity {
            font-size: 3vw;
        }

        #view-order {
            padding: 7px;
            font-size: 3vw;
            width: 15vw;
        }
    }
</style>

<script>
    import axios from 'axios';

    export default {
        name: "InvoiceItem",
        data() {
            return {
                datetime: "",
                price: 0,
                invoices: [],
                id: this.$store.getters.getUserId,
                jwt: this.$cookies.get('jwt').replace(/"/g,""),
            }
        },
        mounted() {
            this.getInvoices();
        },
        methods: {
            getInvoices() {
                const url = process.env.VUE_APP_DOMAIN_NAME_AUTH;

                axios.get(url + "/user/" + this.id, {
                    headers: {
                        'Authorization' : 'Bearer ' + this.jwt
                    }
                }).then((response) => {
                    let invoiceResponse = [];

                    response.data.invoices.forEach(element => {
                        invoiceResponse.push(element);
                    });

                    this.invoices = invoiceResponse;
                });
            }
        }
    }
</script>