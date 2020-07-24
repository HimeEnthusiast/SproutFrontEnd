<template>
    <div id="root">
        <div id="address-container">
            <fieldset id="address-form">
                <span class="input-title">Address: </span>
                <input type="text" id="address1" v-model="address1" minlength="1" maxlength="150" required />
                <span class="error-line" v-if="addressError">Please enter an address.</span>

                <span class="input-title">Apartment/Unit/Other: </span>
                <input type="text" id="address2" v-model="address2" maxlength="150" />

                <span class="input-title">City: </span>
                <input type="text" id="city" v-model="city" minlength="1" maxlength="50" required />
                <span class="error-line" v-if="cityError">Please enter a city.</span>

                <span class="input-title">Province: </span>
                <select id="province" v-model="province" required>
                    <option v-for="province in provinces" :key="province">
                        {{ province }}
                    </option>
                </select>
                <span class="error-line" v-if="provinceError">Please select a province.</span>

                <span class="input-title">Postal Code: </span>
                <input type="text" id="postalcode" v-model="postalcode" minlength="6" maxlength="7" pattern="([ABCEGHJKLMNPRSTVXY][0-9][A-Z][ ]*[0-9][A-Z][0-9])" required />
                <span class="error-line" v-if="postalcodeError">Please enter a postal code in A1B 2C3 format.</span>

                <span id="save-check-container" v-if="jwtExists()">
                    <input id="save-check" type="checkbox" v-model="saveAddress" /> Save this address?
                </span>
            </fieldset>
        </div>

        <button type="button" class="custom-arrow" @click="addressComplete()">
            >
        </button>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root {
        font-family: 'Quicksand', sans-serif;
    }

    #address-container {
        display: flex;
        /* flex-direction: column; */
        justify-content: center;
    }

    #address-form {
        display: flex;
        flex-direction: column;
        border: none;
    }

    input, select {
        margin-bottom: 2%;
        margin-top: 1%;
        padding: 10px;
        width: 30vw;
        border-radius: 5px;
        font-family: 'Raleway', sans-serif;
        border: 1px solid rgb(206, 206, 206);
    }

    #save-check {
        width: 20px;
    }

    .input-title {
        margin: 3% 0 0 0;
    }

    .error-line {
        font-size: 13px;
        color: rgb(240, 0, 0);
    }

    @media (max-width:690px)  {
        #root {
            margin-bottom: 25px;
        }

        input, select {
            width: 65vw;
        }
    }
</style>

<script>
    export default {
        name: "AddressForm",
        data() {
            return {
                address1: "",
                address2: "",
                city: "",
                province: "",
                provinces: ["ON", "QC", "NS", "NB", "MB", "BC", "PE", "SK", "AB", "NL", "NT", "YT", "NU"],
                postalcode: "",
                saveAddress: false,
                addressError: false,
                cityError: false,
                provinceError: false,
                postalcodeError: false
            }
        },
        watch: {
            address1: function() {
                this.$emit('address1', this.address1);
            },
            address2: function() {
                this.$emit('address2', this.address2);
            },
            city: function() {
                this.$emit('city', this.city);
            },
            province: function() {
                this.$emit('province', this.province);
            },
            postalcode: function() {
                this.$emit('postalcode', this.postalcode);
            },
            saveAddress: function() {
                this.$emit('saveAddress', this.saveAddress);
            }
        },
        methods: {
            jwtExists: function() {
                let jwt = false;

                if(this.$cookies.get('jwt')) {
                    jwt = true;
                }

                return jwt;
            },
            addressComplete() {
                let addressLine1 = document.getElementById("address1");
                let city = document.getElementById("city");
                let province = document.getElementById("province");
                let postalcode = document.getElementById("postalcode");

                if(!addressLine1.checkValidity()) {
                    this.addressError = true;
                    addressLine1.style.borderColor = "rgb(240, 0, 0)";
                } else {
                    this.addressError = false;
                    addressLine1.style.borderColor = "rgb(206, 206, 206)";
                }
                
                if (!city.checkValidity()) {
                    this.cityError = true;
                    city.style.borderColor = "rgb(240, 0, 0)";
                } else {
                    this.cityError = false;
                    city.style.borderColor = "rgb(206, 206, 206)";
                }
                
                if (!province.checkValidity()) {
                    this.provinceError = true;
                    province.style.borderColor = "rgb(240, 0, 0)";
                } else {
                    this.provinceError = false;
                    province.style.borderColor = "rgb(206, 206, 206)";
                } 
                
                if (!postalcode.checkValidity()) {
                    this.postalcodeError = true;
                    postalcode.style.borderColor = "rgb(240, 0, 0)";
                } else {
                    this.postalcodeError = false;
                    postalcode.style.borderColor = "rgb(206, 206, 206)";
                }

                if(addressLine1.checkValidity() && city.checkValidity() && province.checkValidity() && postalcode.checkValidity()) {
                    this.$emit('formComplete', 1);
                }
            }
        }
    }
</script>