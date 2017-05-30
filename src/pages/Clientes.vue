<template>

    <div class="tchat__container">
        <sidebar></sidebar>
        <div>
        </div>
        <div class="ui raised padded segment channels__list">
            <ul>
                <li class="channels__item" 
                    v-for="cliente in clientes" 
                    :key="cliente.id"
                    @click="changeChannel(cliente)">
                    # {{ cliente.name }}
               </li>
            </ul>
        </div>
    </div>

</template>

<script>

    import Sidebar from '../components/principal/Sidebar'

    export default {
        name: 'clientes',
        components: { Sidebar },
        data () {
            return {
                clientesRef: firebase.database().ref('clientes'),
                clientes: [],
                cliente: null,
                listeners: []
            }
        },
        methods: {
            addListeners () {
                this.clientesRef.on('child_added', snap => {
                    this.clientes.push(snap.val())
                })
            },
            addCountListener(channelId){
                this.messagesRef.child(channelId).on('value', snap => {
                    this.handleNotifications(channelId, this.currentChannel.id, this.notifCount, snap)
                })
            },            
            getNotification(channel){
                let notif = 0

                this.notifCount.forEach(el => {
                    if(el.id === channel.id){
                        notif = el.notif
                    }
                })
                return notif

            },
            openChannelModal () {
                $("#channelModal").modal('show')
            },
            addChannel () {
                this.errors = []
                let key = this.channelsRef.push().key

                let newChannel = { id: key, name: this.new_channel }
                this.channelsRef.child(key).update(newChannel).then( () => {

                    this.new_channel = ''
                    $("#channelModal").modal('hide')                 

                }).catch( error => {
                    this.errors.push(error.message)
                })
            },
            changeChannel(cliente){   
                this.resetNotifications()                          
                this.$store.dispatch('setPrivate', false)
                this.$store.dispatch('setCurrentChannel', channel)
                this.channel = channel
            },            
            resetNotifications(){
                let index = this.notifCount.findIndex( el => el.id === this.channel.id)
                if(index !== -1){
                    this.notifCount[index].total = this.notifCount[index].lastKnownTotal
                    this.notifCount[index].notif = 0
                }
            },
            detachListeners () {
                this.channelsRef.off()
                this.channels.forEach( el => {
                    this.messagesRef.child(el.id).off()
                })
            },
            setChannelActive(cliente){
                return cliente.id === this.currentChannel.id
            }
        },
    }

</script>

<style scoped>

.tchat__container{
    height: 100%;
}

</style>