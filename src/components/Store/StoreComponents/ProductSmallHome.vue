<template>
    <div id="root">
        <router-link class="router-link" :to="{name: 'products-item', params: {id: id, name: name.replace(/\s+/g, '-').toLowerCase()}}">
        <div id="product">
            <img id="product-photo" :src="image" />
            <div id="product-info">
                <div id="product-name">
                    {{name}}
                </div>
                <div id="product-price">
                    ${{price.toFixed(2)}}
                </div>
            </div>
        </div>
        </router-link>
    </div>
</template>

<style scoped>
    #root {

    }

    #product {
        color: #000000;
        /* position: relative; */
    }

    #product-info {
        /* position: absolute; */
        /* top: 0; */
        background-color: #ffffff7a;
        width: 100%;
        height: 50px;
        padding: 10px 0 10px 0;
    }

    #product-photo {
        width: 100%;
        height: 250px;
        object-fit: cover;
        border-radius: 5px;
    }

    #product-name {
        font-weight: bolder;
        font-size: 120%;
    }

    #product-desc {
        /* padding: 0 0 2px 5px; */
    }

    #product-price {
        font-size: 120%;
    }

    .router-link {
        text-decoration: none;
        color: #00A896;
    }

    @media (max-width:690px)  {
        #root {
            padding: 0;
        }

        #product-info {
            /* height: 30px; */
        }

        #product-photo {
            width: 100%;
            height: 150px;
            border-radius: 5px;
        }

        #product-info {
            padding: 5px 0 0 0;
        }

        #product-name, #product-price {
            font-size: 13px;
            padding: 0;
        }
    }
</style>

<style scoped>

</style>

<script>
    export default {
        props: [
            'id',
            'image',
            'name',
            'description',
            'price'
        ]
    }
</script>