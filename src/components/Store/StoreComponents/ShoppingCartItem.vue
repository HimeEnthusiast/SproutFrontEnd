<template>
    <div id="root">
        <img id="product-photo" :src="image" />
        <div id="product-info">
            <span id="name">{{name}}</span>
            <span id="price">${{price.toFixed(2)}}</span>
        </div>
        <div id="delete-icon" @click="deleteClick">
            <svg aria-hidden="true" 
                id="trashcan-icon"
                focusable="false" 
                data-prefix="fas" 
                data-icon="trash" 
                class="svg-inline--fa fa-trash fa-w-14" 
                role="img" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 448 512">
                    <path 
                        d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z">
                        </path>
            </svg>
        </div>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root {
        font-family: 'Quicksand', sans-serif;
        color: #00A896;
        box-shadow: 0 3px 5px #0000007a;
        display: flex;
        width: 80%;
        flex-direction: row;
        padding: 20px;
        border-radius: 10px;
        margin: 1%;
    }

    #product-info {
        display: flex;
        flex-direction: column;
        padding-left: 15px;
        width: 50%;
    }

    #name, #price {
        padding: 5px;
    }

    #name {
        top: 0;
        font-size: 170%;
    }

    #price {
        bottom: 0;
        font-size: 120%;
    }

    #product-photo {
        width: 100px;
        border-radius: 10px;
    }

    #delete-icon {
        width: 3%;
        min-width: 30px;
        margin-left: auto;
        display: flex;
        align-items: center;
    }

    #delete-icon:hover {
        scale: 1.1;
        cursor: pointer;
    }

    #trashcan-icon {
        fill: #00A896;
    }

    @media (max-width:690px)  {
        #root {
            padding: 15px;
            margin-bottom: 20px;
        }

        #product-photo {
            width: 60px;
            height: 60px;
        }

        #name {
            font-size: 16px;
            padding: 0;
        }

        #price {
            padding: 15px 0 0 0;
        }

        #delete-icon {
            min-width: 20px;
        }
    }
</style>

<script>
    export default {
        props: [
            'image',
            'name',
            'price'
        ],
        methods: {
            deleteClick: function() {
                this.$emit('clicked', 'value');
            }
        }
    }
</script>