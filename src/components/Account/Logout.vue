<template>
    <div id="root">

    </div>
</template>

<script>
    export default {
        name: "Logout",
        mounted() {
            this.$cookies.remove('jwt');
            this.$store.commit('setAuthentication', false);

            this.$router.push("/");
        }
    }
</script>