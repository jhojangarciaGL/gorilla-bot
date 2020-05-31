<template>
    <section class="user-container">
        <section class="user-box">
            <img src="../assets/jhojan.jpg" alt="" class="img-user">
            <span>{{ userName }}</span>
        </section>
    </section>
</template>

<script>
export default {
    data () {
        return {
            userName: 'Jhojan Garcia'
        }
    }
}
</script>

<style scoped>
    .user-container {
        margin-top: 5%;
    }

    .user-box {
        border-radius: 5px;
        background-color: #E4E4E4;
        padding: 2%;
        display: flex;
        align-items: center;
        margin: 0 auto;
        width: 90%;
    }

    .user-box span {
        margin-left: 2%;
        font-weight: bold;
    }

    .img-user {
        border-radius: 50%;
        width: 15%;
    }
</style>