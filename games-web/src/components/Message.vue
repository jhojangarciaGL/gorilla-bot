<template>
    <div class="container-custom" ref="container">
        <template v-for="(message, index) in messages">
            <div :key='index' class="message-container top">
                <img :src="message.from == 'bot'? getImgUrl('donkey.png'):getImgUrl('jhojan.jpg')" :class="`${message.from}-picture`"/>
                <div :class="`${message.from}-message`">
                    <span v-html="message.msg"></span>
                </div>
            </div>
            <div :key='`c${index}`' class="clear"></div>
        </template> 
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    updated(){
        let container = this.$refs.container
        container.scrollTop = container.scrollHeight;
    },
    computed: {
        ...mapGetters(['messages'])
    },
    methods: {
        setTime () {
            const now = new Date()
            let hours = now.getHours()
            let mins = now.getMinutes()
            const ampm = hours >= 12 ? 'pm' : 'am';

            if(hours.toString().length == 1) {
                hours = '0'+hours;
            }
            if(mins.toString().length == 1) {
                mins = '0'+mins;
            }

            return `${hours}:${mins} ${ampm}`
        },
        getImgUrl(pic) {
            return require('../assets/'+pic)
        }
    }
}
</script>

<style scoped>
    .container-custom {
        position: relative;
        padding: 2%;
        height: 87%;
        overflow-y: auto;
        margin-top: 1%;
        width: 98%;
    }

    .message-container{
        position: relative;
        width: 100%;
        margin-top: 1%;
    }

    .clear {
        clear: both;
    }

    .bot-message {
        background-color: #939393;
        position: relative;
        padding: 1%;
        border-radius: 10px;
        float: left;
        color: #000000;
        max-width: 70%;
        min-width: 10%;
        word-break: break-all;
    }

    .user-message {
        position: relative;
        background-color: #454545;
        padding: 1%;
        border-radius: 10px;
        color: #FFFFFF;
        float: right;
        max-width: 70%;
        word-break: break-all;
    }

    .user-picture {
        width: 5%;
        float: right;
        border-radius: 50%;
        margin-left: 2%;
    }

    .bot-picture {
        width: 5%;
        float: left;
        border-radius: 50%;
        margin-right: 2%;
    }

    .container-custom::-webkit-scrollbar {
        width: 7px;
        border-radius: 20px;
        opacity: 0.5;
    }

    .container-custom::-webkit-scrollbar-track {
        background: transparent; 
    }
    
    .container-custom::-webkit-scrollbar-thumb {
        background: #888; 
    }
</style>