<template>
    <div id="root">
        <div id="left">
            <h1>Thank you<br>for ordering!</h1>
        </div>

        <div id="right">
            <span id="total">Your Total: ${{totalCost}}</span>
            
            <router-link class="router-link" :to="{name: 'invoice', params: { id: id }}">
                <button id="view-order">View Order</button>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root {
        font-family: 'Quicksand', sans-serif;
        display: flex;
        text-align: center;
        justify-content: center;
        padding-top: 7%;
        min-height: calc(100vh - 157px);
    }

    #left {
        /* padding-left: 20px; */
        /* margin-right: 20px; */
        width: 40%;
    }

    h1 {
        font-size: 400%;
        color: #00A896;
    }

    #total {
        padding: 15px;
        font-size: 150%;
    }

    #right {
        display: flex;
        /* margin-left: 20px; */
        flex-direction: column;
        /* padding-left: 20px; */
        width: 40%;
        padding-top: 5%;
    }

    #view-order {
        font-size: 150%;
        font-family: 'Quicksand', sans-serif;
        padding: 15px 25px 15px 25px;
        align-self: start;
        background-color: #00A896;
        border: none;
        font-weight: bolder;
        color: #ffffff;
        border-radius: 10px;
        margin: 10px auto 0 auto;
    }

    #view-order:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 2px #0000007a;
        transition: 0.3s;
        cursor: pointer;
    }

    @media (max-width:690px)  {
        #root {
            flex-direction: column;
        }

        #left {
            margin: 0;
        }

        h1 {
            font-size: 63px;
            color: #00A896;
        }

        #total {
            padding: 15px;
            font-size: 20px;
        }

        #right {
            position: absolute;
            margin: 18px;
            bottom: 0;
        }

        #view-order {
            width: 90vw;
            bottom: 0;
        }
    }
</style>

<script>
    import axios from 'axios';

    export default {
        name: "thankyou",
        data() {
            return {
                totalCost: 0,
                id: 0
            }
        },
        mounted() {
            const url = process.env.VUE_APP_DOMAIN_NAME_AUTH;

            axios.get(url + "/get-invoice/" + this.$route.params.id)
            .then(response => {
                this.totalCost = response.data.totalCost.toFixed(2);
                this.id = this.$route.params.id;
            });
        }
    }
</script>