<template>
    <div id="root-cart">
        <img id="product-photo" :src="image" />
        <div id="product-info">
            <span id="name">{{name}}</span>
            <span id="price">${{price.toFixed(2)}}</span>
            <div id="quantity">
                <button class="quan-btn" id="plus" @click="increaseQuantity()">
                    <svg
                        id="plus-button"
                        aria-hidden="true" 
                        focusable="false" 
                        data-prefix="fas" 
                        data-icon="plus" 
                        class="svg-inline--fa fa-plus fa-w-14" 
                        role="img" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 448 512">
                            <path 
                                d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z">
                            </path>
                    </svg>
                </button>
                <span id="num">{{quantity}}</span>
                <button class="quan-btn" id="minus" @click="decreaseQuantity()">
                    <svg
                        id="minus-button"
                        aria-hidden="true" 
                        focusable="false" 
                        data-prefix="fas" 
                        data-icon="minus" 
                        class="svg-inline--fa fa-minus fa-w-14" 
                        role="img" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 448 512">
                            <path 
                                d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z">
                            </path>
                    </svg>
                </button>
            </div>
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
        <!-- <hr> -->
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root-cart {
        font-family: 'Quicksand', sans-serif;
        color: #00A896;
        display: flex;
        flex-direction: row;
        padding: 20px;
        border-radius: 10px;
    }

    #product-info {
        display: flex;
        flex-direction: column;
        padding-left: 15px;
        width: 50%;
    }

    #name, #price, #quantity {
        padding: 5px;
    }

    #name {
        top: 0;
        font-size: 170%;
        font-weight: bolder;
        color: #000000;
        /* padding-bottom: 0; */
    }

    #price {
        font-size: 120%;
        color: #000000;
        padding-top: 0;
    }

    #quantity {
        border: 1px solid #00A896;
        width: 90px;
        padding: 0;
        margin-top: auto;
    }

    #num {
        display: inline-block;
        width: 30px;
        text-align: center;
        color: #000000;
    }

    #plus-button, #minus-button {
        fill: #ffffff;
        height: 10px;
    }

    .quan-btn {
        border: none;
        width: 30px;
        padding: 5px;
        background-color: #00A896;
        color: #ffffff;
    }

    .quan-btn:hover{
        cursor: pointer;
    }

    #product-photo {
        width: 120px;
        height: 120px;
        border-radius: 10px;
    }

    #delete-icon {
        width: 3%;
        min-width: 25px;
        margin-left: auto;
        display: flex;
        align-items: center;
    }

    #delete-icon:hover {
        scale: 1.1;
        transition: 0.3s;
        cursor: pointer;
    }

    #trashcan-icon {
        fill: #00A896;
        max-width: 35px;
    }

    @media (max-width:690px)  {
        #root {
            /* padding: 15px; */
            margin-bottom: 20px;
        }

        #product-photo {
            width: 90px;
            height: 90px;
        }

        #name {
            font-size: 16px;
            padding: 0;
        }

        #price {
            padding: 0;
            font-size: 14px;
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
            'price',
            'quantity'
        ],
        methods: {
            deleteClick: function() {
                this.$emit('clicked', 'value');
            },
            increaseQuantity() {
                this.$emit('increase', 'value');
            },
            decreaseQuantity() {
                this.$emit('decrease', 'value');
            }
        }
    }
</script>