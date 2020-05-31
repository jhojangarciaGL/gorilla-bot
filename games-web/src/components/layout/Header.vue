<template>
    <nav class="navbar custom-color" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <div class="nav-container">
                <img src="../../assets/gl_logo.png" alt="GL" />
            </div> 
        </div>
        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons-lang">                    
                       <span class="lang-btn" :class="{'active': lang === 'es'}" @click="setLang('es')">ES</span> 
                       / 
                       <span class="lang-btn" :class="{'active': lang === 'en'}" @click="setLang('en')">EN</span>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['lang'])
    },
    methods: {
        ...mapActions(['setLang']),
    }
}
</script>

<style scoped>
    .custom-color {
        background-color: #FFFFFF;
    }

    .nav-title {
        color: #FFFFFF;
        margin-left: 1%;
        font-weight: 600;
        font-size: 16px;
    }

    .nav-container img {
        width: 10%;
    }

    .nav-container {
        display: flex;
        padding: 1%;
        align-items: center;
    }

    .buttons-lang {
        color: #000000;
        font-weight: bold;
    }

    .lang-btn {
        cursor: pointer;
    }

    .active {
        border-bottom: 1px solid #000000;
    }

</style>