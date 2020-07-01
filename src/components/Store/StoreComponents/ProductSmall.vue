<template>
    <div id="root">
        <router-link class="router-link" :to="{name: 'products-item', params: {id: id, name: name.replace(/\s+/g, '-').toLowerCase()}}">
        <div id="product">
            <img id="product-photo" :src="image" />
            <div id="product-name">
                {{name}}
            </div>
            <div id="product-price">
                ${{price.toFixed(2)}}
            </div>
        </div>
        </router-link>
    </div>
</template>

<style scoped>
    #root {
        padding: 10px;
    }

    #product {
        width: 13%;
        min-width: 200px;
        color: #00A896;
    }

    #product-photo {
        width: 100%;
        height: 200px;
        border-radius: 10px;
        box-shadow: 0 3px 5px #0000007a;
    }

    #product-name {
        font-weight: bolder;
        font-size: 120%;
        padding: 5px 5px 0 5px;
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
            padding: 10px;
        }

        #product-photo {
            width: 60%;
            height: 60%;
        }

        #product-name, #product-price {
            font-size: 13px;
            width: 120px;
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