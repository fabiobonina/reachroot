<template>


<div>   
<div class="ui middle aligned center aligned grid login__container">
        <div class="column">
            <h2 class="ui orange header">
                <div class="content">
                    #Tuto::Slack#
                </div>
            </h2>
            <form class="ui large form" :class="{ 'error' : hasErrors }">
                <div class="ui stacked segment">

                    <div class="field">
                        <div class="ui left icon input">
                            <i class="user icon"></i>
                            <input type="email" name="email" placeholder="Email" v-model.trim="email">
                        </div>
                    </div>

                    <div class="field">
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input type="password" name="password" placeholder="senha" v-model.trim="password">
                        </div>
                    </div>

                    <div class="ui fluid large orange button" @click.prevent="login" :class="{ 'loading': isLoading }">Conecte-se</div>
                </div>

                <div class="ui error message" v-if="hasErrors">
                    <p v-for="error in errors">{{ error }}</p>
                </div>

            </form>
        </div>

</div>
        <md-layout md-align="center" >
            <md-layout md-column md-gutter md-flex="35">
            <div>
                <div>
                    <md-toolbar>
                        <div class="md-toolbar-container">
                            <h3 class="md-title">SkyHub Web | Mobi</h3>
                        </div>
                    </md-toolbar>
                    
                    <div>
                        <form novalidate @submit.stop.prevent="submit">
                            <md-input-container>
                                <label>Email</label>
                                <md-input type="email"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>Senha</label>
                                <md-input type="password"></md-input>
                            </md-input-container>
                        </form>
                        <md-bottom-bar md-shift class="md-raised md-accent">
                                <md-button class="md-primary"@click.prevent="login" :class="{ 'loading': isLoading }">Conecte-se</md-button>
                            </md-bottom-bar>
                    </div>

                    <div>
                        <md-bottom-bar  md-shift md-theme="teal">
                            <spam><br/>É novo aqui? <router-link to="/registro">Criar Conta</router-link></spam>
                        </md-bottom-bar>
                    </div>
                </div>
            </div>
            </md-layout>
         </md-layout>
</div>
</template>

<script>
export default {
        name: 'login',
        data() {
            return {
                email: '',
                password: '',
                errors: [],
                isLoading: false
            }
        },
        computed: {
            hasErrors () {
                return this.errors.length > 0
            }
        },
        methods: {
            login() {
                console.log("login")
                this.errors = []
                
                if(this.isFormValid()){
                    this.isLoading = true

                    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(user => {

                        this.$store.dispatch('setUser', user)
                        this.$router.push('/')

                    }).catch(error => {
                        this.errors.push(error.message)
                        this.isLoading = false
                    })
                }
            },
            isFormValid(){
                if(this.email.length > 0 && this.password.length > 0){
                    return true
                }
                return false
            }
        }
    }
</script>

<style scoped>
     .login__container{
        margin-top: 40px;
    }
    .column{
        max-width: 450px;
    }


</style>