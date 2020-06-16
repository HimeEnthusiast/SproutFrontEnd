<template>
    <div id="root">
        <div id="left">
            <AddressItem @delete="resetA = resetA + $event" :key="resetA"></AddressItem>
            
            <PaymentItem @delete="resetB = resetB + $event" :key="resetB"></PaymentItem>

            <InvoiceItem></InvoiceItem>
        </div>

        <UserForm></UserForm>        
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap');

    #root {
        font-family: 'Quicksand', sans-serif;
        display: flex;
    }

    #left {
        width: 50%;
        margin-left: 30px;
    }

    #edit-button {
        width: 50px;
        height: 50px;
        border-radius: 7px;
        border: none;
    }

    #edit-button {
        background-color: #00A896;
    }

    #edit-icon {
        width: 60%;
        fill: #ffffff;
    }

    #edit-button:hover {
        scale: 1.1;
        transition: 0.3s;
    }
</style>

<script>
    import AddressItem from './AccountComponents/AddressItem'
    import PaymentItem from './AccountComponents/PaymentItem'
    import UserForm from './AccountComponents/UserForm'
    import InvoiceItem from './AccountComponents/InvoiceItem'

    export default {
        name: 'Account',
        components: {
            AddressItem,
            PaymentItem,
            UserForm,
            InvoiceItem
        },
        data() {
            return {
                resetA: 0,
                resetB: 1
            }
        }
    }
</script>