<template>
    <div id="root">
        <div id="popup">
            <h1>{{action}} Address</h1>
            <div id="editable-lines">
                <h3>Address: </h3>
                <input class="form-input" id="address1" v-model="line1" type="text" minlength="1" maxlength="150" required />
                <span class="error" v-if="addressError">Address cannot be null.</span>

                <h3>Apartment/Unit/Other: </h3>
                <input class="form-input" id="address2" v-model="line2" type="text" maxlength="150" />

                <h3>City: </h3>
                <input class="form-input" id="city" v-model="cit" type="text" minlength="1" maxlength="50" required />
                <span class="error" v-if="cityError">City cannot be null.</span>

                <h3>Province: </h3>
                <select class="form-input" id="province" v-model="prov" required>
                    <option v-for="province in provinces" :key="province">
                        {{ province }}
                    </option>
                </select>

                <h3>Postal Code: </h3>
                <input class="form-input" id="postalcode" v-model="post" type="text" minlength="6" maxlength="7" pattern="([ABCEGHJKLMNPRSTVXY][0-9][A-Z][ ]*[0-9][A-Z][0-9])" required />
                <span class="error" v-if="postalFormatError">Postal Code must be in Canadian format. ex. A1B 2C3</span>
            </div>

            <div id="buttons">
                <button id="confirm-button" ref="confirm-btn" @click="edit ? editData() : createData()">
                    <svg
                        id="confirm-icon"
                        aria-hidden="true" 
                        focusable="false" 
                        data-prefix="fas" 
                        data-icon="check" 
                        class="svg-inline--fa fa-check fa-w-16" 
                        role="img" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 512 512">
                            <path 
                                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                            </path>
                    </svg>
                </button>

                <button id="cancel-button" ref="cancel-btn" @click="closeWindow()">
                    <svg
                        id="cancel-icon"
                        aria-hidden="true" 
                        focusable="false" 
                        data-prefix="fas" 
                        data-icon="times" 
                        class="svg-inline--fa fa-times fa-w-11" 
                        role="img" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 352 512">
                            <path 
                                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z">
                            </path>
                    </svg>
                </button>
            </div>
        </div>

        <div id="background">

        </div>
    </div>
</template>

<style scoped>
    #popup {
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #ffffff;
        width: 60vh;
        padding: 25px;
        border-radius: 15px;
        z-index: 1;
        left: 0;
        right: 0;
        top: 17%;
        margin: 0 auto 0 auto;
        box-shadow: 0 5px 5px #0000004a;
    }

    .error {
        color: rgb(228, 0, 49);
        font-size: 13px;
    }

    #background {
        position: absolute;
        background-color: #000000;
        height: 100%;
        width: 100%;
        left: 0;
        opacity: 50%;
    }

    #editable-lines {
        display: flex;
        flex-direction: column;
        margin-bottom: 3%;
    }

    input, select {
        margin-bottom: 3%;
        margin-top: 1%;
        padding: 2%;
        width: 40vh;
        border-radius: 5px;
        font-family: 'Raleway', sans-serif;
        border: 1px solid rgb(206, 206, 206);
    }

    h3 {
        margin: 3% 0 0 0;
    }

    #buttons {
        margin-left: auto;
    }

    #confirm-button, #cancel-button {
        width: 50px;
        height: 50px;
        border-radius: 7px;
        border: none;
        background-color: #00A896;
        margin-right: 20px;
        vertical-align: middle;
    }

    #cancel-button {
        background-color: #b90047;
    }

    #confirm-icon, #cancel-icon {
        width: 60%;
        fill: #ffffff;
    }

    #confirm-button:hover, #cancel-button:hover {
        cursor: pointer;
        scale: 1.1;
        transition: 0.3s;
    }

    @media (max-width:500px)  {
        #popup {
            position: absolute;
            width: calc(100% - 20px);
            height: 100%;
            padding: 10px;
            border-radius: 0;
            top: 0px;
            box-shadow: none;
        }

        #editable-lines {
            margin-bottom: 10px;
        }

        input, select {
            margin-bottom: 13px;
            padding: 10px;
            width: 40vh;
        }
    }
</style>

<script>
    import axios from 'axios';

    export default {
        name: "EditAddressPopup",
        props: {
            isEdit: Boolean,
            address1: String,
            address2: String,
            city: String,
            province: String,
            postal: String,
            addressId: Number
        },
        data() {
            return {
                provinces: ["ON", "QC", "NS", "NB", "MB", "BC", "PE", "SK", "AB", "NL", "NT", "YT", "NU"],
                action: "",
                line1: this.address1,
                line2: this.address2,
                cit: this.city,
                prov: this.province,
                post: this.postal,
                edit: this.isEdit,
                id: this.addressId,
                jwt: this.$cookies.get('jwt').replace(/"/g,""),
                addressError: false,
                cityError: false,
                postalFormatError: false
            }
        },
        mounted() {
            let provinceField = document.getElementById("province");

            if (this.edit == true) {
                this.action = "Edit";
            } else {
                this.action = "Add";
                provinceField.selectedIndex = 0;
            }
        },
        methods: {
            closeWindow() {
                this.$emit('clicked', 'value');
            },
            editData() {
                const url = process.env.VUE_APP_DOMAIN_NAME_AUTH;
                let cityField = document.getElementById("city");
                let addressField = document.getElementById("address1");
                let postalField = document.getElementById("postalcode");

                if(cityField.checkValidity() && addressField.checkValidity() && postalField.checkValidity()) {
                    this.cityError = false;
                    this.addressError = false;
                    this.postalFormatError = false;

                    axios.post(url + "/edit-user-address/" + this.id, {
                        address1: this.line1,
                        address2: this.line2,
                        city: this.cit,
                        province: this.prov,
                        postalcode: this.post
                    },
                    {
                        headers: {
                            'Authorization' : 'Bearer ' + this.jwt
                        }
                    }).then((response) => {
                        console.log(response.data);
                        this.$emit('done', 1);
                    });
                } else {
                    if(!cityField.checkValidity()) {
                        this.cityError = true;
                    }

                    if(!addressField.checkValidity()) {
                        this.addressError = true;
                    }

                    if(postalField.value == "" || postalField.value == " " || !/([ABCEGHJKLMNPRSTVXY][0-9][A-Z][ ]*[0-9][A-Z][0-9])/.test(postalField.value)) {
                        this.postalFormatError = true;
                    }
                }
            },
            createData() {
                const url = process.env.VUE_APP_DOMAIN_NAME_AUTH;
                let cityField = document.getElementById("city");
                let addressField = document.getElementById("address1");
                let postalField = document.getElementById("postalcode");

                if(cityField.checkValidity() && addressField.checkValidity() && postalField.checkValidity()) {
                    this.cityError = false;
                    this.addressError = false;
                    this.postalNullError = false;
                    this.postalFormatError = false;

                    axios.post(url + "/add-user-address", {
                        address1: this.line1,
                        address2: this.line2,
                        city: this.cit,
                        province: this.prov,
                        postalcode: this.post
                    },
                    {
                        headers: {
                            'Authorization' : 'Bearer ' + this.jwt
                        }
                    }).then((response) => {
                        console.log(response.data);
                    });

                    this.$emit('done', 1);
                } else {
                    if(!cityField.checkValidity()) {
                        this.cityError = true;
                    }

                    if(!addressField.checkValidity()) {
                        this.addressError = true;
                    }

                    if(postalField.value == "" || postalField.value == " " || !/([ABCEGHJKLMNPRSTVXY][0-9][A-Z][ ]*[0-9][A-Z][0-9])/.test(postalField.value)) {
                        this.postalFormatError = true;
                    }
                }
            }
        }
    }
</script>