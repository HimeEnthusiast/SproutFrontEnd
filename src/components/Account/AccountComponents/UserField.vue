<template>
    <div id="root">
        <h3 id="title">{{title}}</h3>

        <form id="content" @submit.prevent="sendEdit()">
            <div id="field" ref="field">{{field}}</div>
            <input class="editable-field" v-if="!password && !email" ref="editable-field" type="text" v-model="field" minlength="1" maxlength="50" />
            <input class="editable-field" v-if="password && !email" ref="editable-field" type="password" v-model="field" minlength="6" maxlength="50" />
            <input class="editable-field" id="email-field" v-if="!password && email" ref="editable-field" type="email" v-model="field" />
        
            <button type="button" id="edit-button" ref="edit-btn" @click="editField()">
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

            <label id="confirm-button" ref="confirm-btn">
                <input id="submit-button" type="submit" />
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
            </label>

            <button type="button" id="cancel-button" ref="cancel-btn" @click="cancelEdit()">
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
        </form>
        <span id="email-error" v-if="emailError">Please enter a valid email.</span>
    </div>
</template>

<style scoped>
    #root {
        margin-bottom: 25px;
    }

    #title {
        margin: 0 0 10px 0;
    }

    #content {
        display: flex;
        flex-direction: row;
    }

    #field, .editable-field {
        margin-right: 25px;
        padding: 15px;
        width: 100%;
        border-radius: 5px;
        font-family: 'Raleway', sans-serif;
        border: 1px solid rgb(206, 206, 206);
    }

    .editable-field {
        display: none;
        font-size: 16px;
    }

    #submit-button {
        display: none;
    }

    #email-error {
        color: rgb(228, 0, 49);
        font-size: 15px;
        margin-top: 10px;
    }

    #edit-button, #confirm-button, #cancel-button {
        min-width: 50px;
        min-height: 50px;
        max-width: 50px;
        max-height: 50px;
        border-radius: 7px;
        border: none;
        background-color: #00A896;
        margin-right: 20px;
    }

    #confirm-button {
        display: none;
        justify-content: center;
    }

    #cancel-button {
        display: none;
        background-color: #b90047;
    }

    #edit-icon, #confirm-icon, #cancel-icon {
        width: 60%;
        fill: #ffffff;
    }

    #edit-icon {
        text-align: center;
    }

    #edit-button:hover, #confirm-button:hover, #cancel-button:hover {
        cursor: pointer;
        scale: 1.1;
        transition: 0.3s;
    }

    @media (max-width:500px)  {
        #title {
            font-size: 15px;
        }

        #field, .editable-field {
            margin-right: 13px;
            padding: 12px;
            width: 100%;
            font-size: 14px;
        }

        #email-error {
            font-size: 12px;
            margin-top: 5px;
        }

        #edit-button, #confirm-button, #cancel-button {
            width: 40px;
            height: 40px;
            margin-right: 13px;
        }

        #edit-icon, #confirm-icon, #cancel-icon {
            width: 65%;
        }
    }
</style>

<script>
    export default {
        name: 'userfield',
        props: {
            title: String,
            field: String,
            password: Boolean,
            email: Boolean
        },
        data() {
            return {
                emailError: false
            }
        },
        methods: {
            editField() {
                let editButton = this.$refs['edit-btn'];
                let confirmButton = this.$refs['confirm-btn'];
                let cancelButton = this.$refs['cancel-btn'];
                let field = this.$refs['field'];
                let editableField = this.$refs['editable-field'];

                field.style.display = "none";
                editableField.style.display = "initial";

                editButton.style.display = "none";
                confirmButton.style.display = "flex";
                cancelButton.style.display = "initial";
            },
            cancelEdit() {
                let editButton = this.$refs['edit-btn'];
                let confirmButton = this.$refs['confirm-btn'];
                let cancelButton = this.$refs['cancel-btn'];
                let field = this.$refs['field'];
                let editableField = this.$refs['editable-field'];

                field.style.display = "initial";
                editableField.style.display = "none";

                editButton.style.display = "initial";
                confirmButton.style.display = "none";
                cancelButton.style.display = "none";
            },
            sendEdit() {
                let editButton = this.$refs['edit-btn'];
                let confirmButton = this.$refs['confirm-btn'];
                let cancelButton = this.$refs['cancel-btn'];
                let field = this.$refs['field'];
                let editableField = this.$refs['editable-field'];
                let emailField = document.getElementById("email-field");

                if(/\S+@\S+\.\S+/.test(emailField.value)) {
                    this.emailError = false;

                    field.style.display = "initial";
                    editableField.style.display = "none";

                    editButton.style.display = "initial";
                    confirmButton.style.display = "none";
                    cancelButton.style.display = "none";
                    
                    this.$emit('clicked', this.field);
                } else {
                    this.emailError = true;
                }

                
            }
        }
    }
</script>