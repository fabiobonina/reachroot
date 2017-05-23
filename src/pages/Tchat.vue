<template>
  <div>Status</div>
</template>

<script>

    import Sidebar from '../components/sidebar/Sidebar'
    import Messages from '../components/messages/Messages'
    
    export default {
        name: 'tchat',
        components: { Sidebar, Messages }
    }

</script>

<style scoped>

.tchat__container{
    height: 100%;
}

</style>