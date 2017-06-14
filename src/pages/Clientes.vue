<template>
    <div>
    <div class="tchat__container">
        <sidebar></sidebar>
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
                <md-toolbar class="md-medium">
                <md-button class="md-icon-button">
                    <md-icon>menu</md-icon>
                </md-button>
                <h2 class="md-title" style="flex: 1">Users</h2>
                <md-button class="md-icon-button" @click.native="showAddModal = true">
                    <md-icon>add</md-icon>
                </md-button>
            </md-toolbar>
            <div>
                <p class="successMessage" v-if="successMessage">{{successMessage}}</p>
                <p class="errorMessage" v-if="errorMessage">{{errorMessage}}</p>
                
                <md-table>
                    <md-table-header>
                    <md-table-row>
                        <md-table-head>ID</md-table-head>
                        <md-table-head>Nome</md-table-head>
                        <md-table-head>Usuario</md-table-head>
                        <md-table-head>Email</md-table-head>
                        <md-table-head>&nbsp;</md-table-head>
                    </md-table-row>
                    </md-table-header>
                    <md-table-body>
                    <md-table-row v-for="cliente in clientes">
                        <md-table-cell>{{cliente.id}}</md-table-cell>
                        <md-table-cell>{{cliente.nome}}</md-table-cell>
                        <md-button class="md-icon-button md-raised md-primary" @click.native="showEditModal = true; selecUser(cliente)"><md-icon>edit</md-icon></md-button>
                        <md-button class="md-icon-button md-raised md-accent" @click.native="showDeletModal = true; selecUser(cliente)"><md-icon>delete</md-icon></md-button>
                    </md-table-row>
                    </md-table-body>
                </md-table>
            </div>

            <pre>{{ $data }}</pre>

            <div class="modal" id="addModal" v-if="showAddModal">
                <div class="modalContainer">
                    <md-toolbar>
                        <div class="md-toolbar-container">
                            <h3 class="md-title">Novo Usuario</h3>
                        </div>
                    </md-toolbar>
                    <div class="modalContent">
                        <form novalidate @submit.stop.prevent="submit">
                            <md-input-container>
                                <label>Nome</label>
                                <md-input type="text" v-model="newUser.nome"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>Usuario</label>
                                <md-input type="text" v-model="newUser.user"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>Email</label>
                                <md-input type="text" v-model="newUser.email"></md-input>
                            </md-input-container>
                        </form>
                    </div>
                    <div>
                        <md-bottom-bar md-theme="teal">
                            <md-bottom-bar-item md-icon="cancel" @click.native="showAddModal = false; saveUser()">Salva</md-bottom-bar-item>
                        </md-bottom-bar>
                    </div>
                </div>
            </div>
            <div class="modal" id="editModal" v-if="showingEditModal">
                <div class="modalContainer">
                    <md-toolbar>
                        <div class="md-toolbar-container">
                            <h3 class="md-title">Editar Usuario</h3>
                        </div>
                    </md-toolbar>
                    <div class="modalContent">
                        <form novalidate @submit.stop.prevent="submit">
                            <md-input-container>
                                <label>Nome</label>
                                <md-input type="text" v-model="modalUser.nome"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>Usuario</label>
                                <md-input type="text" v-model="modalUser.user"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>Email</label>
                                <md-input type="text" v-model="modalUser.email"></md-input>
                            </md-input-container>
                        </form>
                    </div>
                    <div>
                        <md-bottom-bar md-theme="teal">
                            <md-bottom-bar-item md-icon="cancel" @click.native="showingEditModal = false">Cancelar</md-bottom-bar-item>
                            <md-bottom-bar-item md-icon="save" @click.native="showingEditModal = false; updateUser()">Salva</md-bottom-bar-item>
                        </md-bottom-bar>
                    </div>
                </div>
            </div>
            <div class="modal" id="deletModal" v-if="showingDeletModal">
                <div class="modalContainer">
                    <md-toolbar>
                        <div class="md-toolbar-container">
                            <h3 class="md-title">você tem certeza?</h3>
                        </div>
                    </md-toolbar>
                    <div class="modalContent">
                        <p>Você vai apagar '{{modalUser.nome}}'.</p>
                    </div>
                    <div>
                        <md-bottom-bar md-theme="teal">
                            <md-bottom-bar-item md-icon="cancel" @click.native="showingDeletModal = false">Cancelar</md-bottom-bar-item>
                            <md-bottom-bar-item md-icon="delete" @click.native="showingDeletModal = false; deleteUser()">Deletar</md-bottom-bar-item>
                        </md-bottom-bar>
                    </div>
                </div>
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
                showAddModal: false,
                showEditModal: false,
                showDeletModal: false,
                channelsRef: firebase.database().ref('clientes'),
                clientes: [],
                newCliente: {},
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