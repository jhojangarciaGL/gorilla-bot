<template>
    <div class="is-fullheight columns">
        <div class="column is-3 relative">
            <div class="background2"></div>
            <dk-user />
        </div>
        <div class="column is-9 custom-h">
            <div class="background"></div>
            <div class="donkey-title">
                <img src="../assets/donkey.png" alt="donkey kong" />                
                <span>Donkey Kong</span>
            </div>
            <dk-message />
            <div class="chat">
                <input type="text" name="" id="" placeholder="Write a message here" v-model="message" @keyup.enter='handleSendMessage()'>
                <img src="../assets/send.svg" alt="" class="send" @click="handleSendMessage()">
            </div>
        </div>
    </div>
</template>

<script>
import DkUser from './User.vue'
import DkMessage from './Message.vue'
import { mapActions } from 'vuex'
export default {
    components: { DkUser, DkMessage },
    data() {
        return {
            message: ''
        }
    },
    created () {
        
    },
    methods: {
        ...mapActions(['sendMessage']),
        handleSendMessage () {
            const message = {
                msg: this.message,
                from: 'user'
            }
            this.sendMessage({ message })
            this.message = ''
        }
    }
}
</script>

<style scoped>
    .is-fullheight {
        background-color: #343434;
    }

    .is-fullheight.columns {
        height: calc(100vh - ( 3.25rem - .75rem ) );
    }

    .donkey-title {
        display: flex;
        align-items: center;
        background-color: #DBDBDB;
    }

    .donkey-title img {
        width: 6%;
        border-radius: 50%;
        margin-left: 1%;
    }


    .donkey-title span {
        font-weight: bold;
        margin-left: 1%;
    }

    .column {
        padding-left: 0 !important;
        padding-right: 0 !important;
    }

    .chat {
        position: fixed;
        padding: 1%;
        background-color: #D1D1D1;
        width: 100%;
        display: flex;
        align-items: center;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .chat input {
        border-radius: 15px;
        width: 70%;
        box-shadow: none;
        border: none;
        padding: 10px;
        font-family: arial;
        font-size: 14px;
    }
    
    .send {
        width: 1.5%;
        margin-left: 1%;
        cursor: pointer;
    }

    ::placeholder {
        color: #999999;
    }

    .background {
        position: absolute;
        background-image: url(../assets/super_g.png);
        background-size: 30%;
        background-repeat: no-repeat;
        background-position: center;
        width: 100%;
        height: 100%;
        opacity: 0.1;
    }

    .background2 {
        position: absolute;
        background-image: url(../assets/super_g.png);
        background-size: 70%;
        background-repeat: no-repeat;
        background-position: center;
        width: 100%;
        height: 100%;
        opacity: 0.5;
    }

    .custom-h {
        position: relative;
        height: 90%;
        background-color: #FFFFFF;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .relative {
        position: relative;
    }

</style>