<template>
    <div id="root" v-if="isLoading()">
        <img id="loading-icon" src="../../assets/spinner.svg">
    </div>
</template>

<style scoped>
    #root {
        position: absolute;
        display: flex;
        width: 100%;
        height: calc(100vh - 100.8px);
        background: #0000007a;
        margin-top: -2%;
        z-index: 100;
    }

    #loading-icon {
        position: relative;
        margin: auto;
    }
</style>

<script>
    export default {
        computed: {
            isLoading() {
                return this.$store.getters.getLoadingStatus;
            }
        }
    }
</script>