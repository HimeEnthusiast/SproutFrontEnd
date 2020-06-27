<template>
    <div id="root-top">
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

    #root-top {
        font-family: 'Quicksand', sans-serif;
        display: flex;
    }

    #left {
        width: 50%;
        margin-left: 30px;
    }
    
    @media (max-width:500px)  {
        #root-top {
            flex-direction: column;
            margin: 50px 0 10px 15px;
        }

        #left {
            width: 100%;
            margin: 0;
        }
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