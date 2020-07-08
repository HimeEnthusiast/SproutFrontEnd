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
        position: relative;
    }

    #product-info {
        position: absolute;
        top: 0;
        background-color: #ffffff7a;
        width: 100%;
        height: 50px;
        padding: 10px;
    }

    #product-photo {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }

    #product-name {
        font-weight: bolder;
        font-size: 120%;
    }

    #product-desc {
        padding: 0 0 2px 5px;
    }

    #product-price {
        padding-left: 5px;
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
            height: 30px;
        }

        #product-photo {
            width: 100%;
            height: 210px;
        }

        #product-name, #product-price {
            font-size: 13px;
            /* width: 110px; */
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