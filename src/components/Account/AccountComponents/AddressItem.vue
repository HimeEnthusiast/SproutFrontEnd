<template>
    <div id="root">
        <EditAddressPopup id="address-popup" :isEdit="edit" :key="reset" @done="refresh()" @clicked="closeWindow()" :address1="address1" :address2="address2" :city="city" :province="province" :postal="postalCode" :addressId="addressId"></EditAddressPopup>

        <h1 id="title">Your Addresses</h1>
        <button id="add-title-button" @click="openAddressPopup(false)">
            <h3 id="add-title">+ Add Address</h3>
        </button>

        <div id="card-grid">
            <div id="card" v-for="address in addresses" :key="address.id"> <!-- This div gets repeated -->
                <div id="address-lines">
                    <span class="line">{{address.lineOne}}</span>
                    <span class="line" v-if="address.lineTwo">{{address.lineTwo}}</span>
                    <span class="line">{{address.city}}, {{address.province}}</span>
                    <span class="line">{{address.postalCode}}</span>
                </div>
                
                <div id="buttons">
                    <button id="edit-button" @click="openAddressPopup(true, address.lineOne, address.lineTwo, address.city, address.province, address.postalCode, address.id)">
                        <svg
                            id="edit-icon" 
                            aria-hidden="true" 
                            focusable="false" 
                            data-prefix="fas" 
                            data-icon="pen" 
                            class="svg-inline--fa fa-pen fa-w-16" 
                            role="img" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 512 512">
                                <path 
                                    d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                                </path>
                        </svg>
                    </button>
                    
                    <button id="delete-button" @click="deleteAddress(address.id)">
                        <svg 
                            id="delete-icon"
                            aria-hidden="true" 
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
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root {
        font-family: 'Quicksand', sans-serif;
        display: flex;
        flex-direction: column;
    }

    #title {
        margin-bottom: 0;
    }

    #add-title-button {
        border: none;
        background-color: #00A896;
        width: 20%;
        min-width: 140px;
        margin: 10px 0 20px 0;
        border-radius: 10px;
        padding-left: 0;
    }

    #add-title {
        margin: 12px;
        color: #ffffff;
        font-family: 'Quicksand', sans-serif;
    }

    #add-title-button:hover {
        cursor: pointer;
    }

    #card-grid {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 300px));
    }

    #card {
        display: flex;
        width: 230px;
        padding: 25px;
        border-radius: 10px;
        box-shadow: 0 1px 5px #0000004a;
        justify-self: center;
        align-items: center;
        margin-bottom: 30px;
    }

    #address-lines {
        display: flex;
        flex-direction: column;
        width: 70%;
    }

    .line {
        margin-bottom: 6px;
    }

    #buttons {
        width: 30%;
        text-align: right;
        fill: #ffffff;
    }

    #edit-button, #delete-button {
        width: 50px;
        height: 50px;
        border-radius: 7px;
        border: none;
    }

    #edit-button {
        margin-bottom: 20px;
        background-color: #00A896;
    }

    #delete-button {
        background-color: #b90047;
    }

    #edit-icon, #delete-icon {
        width: 60%;
    }

    #edit-button:hover, #delete-button:hover {
        cursor: pointer;
        scale: 1.1;
        transition: 0.3s;
    }
</style>

<script>
    import EditAddressPopup from './EditAddressPopup';
    import axios from 'axios';

    export default {
        name: 'AddressItem',
        components: {
            EditAddressPopup
        },
        data() {
            return {
                edit: true,
                reset: 0,
                address1: "",
                address2: "",
                city: "",
                province: "",
                postalCode: "",
                id: this.$store.getters.getUserId,
                jwt: this.$cookies.get('jwt').replace(/"/g,""),
                addresses: [],
                addressId: 0
            }
        },
        created() {
            this.getAddresses();
        },
        mounted() {
            document.getElementById("address-popup").style.display = "none";
        },
        watch: {
            edit: function() {
                this.reset = this.reset + 1;
            },
            address1: function() {
                this.reset = this.reset + 1;
            }
        },
        methods: {
            openAddressPopup(isEdit, line1, line2, city, province, postalCode, addressId) {
                document.getElementById("address-popup").style.display = "initial";
                this.edit = isEdit;
                this.address1 = line1;
                this.address2 = line2;
                this.city = city;
                this.province = province;
                this.postalCode = postalCode;
                this.addressId = addressId;
            },
            closeWindow() {
                document.getElementById("address-popup").style.display = "none";
            },
            getAddresses() {
                axios.get(process.env.DOMAIN_NAME_AUTH + "/user/" + this.id, {
                    headers: {
                        'Authorization' : 'Bearer ' + this.jwt
                    }
                }).then((response) => {
                    let addressResponse = [];

                    response.data.addresses.forEach(element => {
                        addressResponse.push(element);
                    });

                    this.addresses = addressResponse;
                });
            },
            deleteAddress(addressId) {
                axios.post(process.env.DOMAIN_NAME_AUTH + "/delete-address/" + addressId, {
                    id: addressId
                },
                {
                    headers: {
                        'Authorization': 'Bearer ' + this.jwt
                    }
                }).then((response) => {
                    console.log(response.data);
                });

                this.getAddresses();
                this.$emit('delete', 1);
            },
            refresh() {
                this.closeWindow();
                this.$emit('delete', 1);
            }
        }
    }
</script>