<template>

    <div>
        <!-- 顶部区域 -->
        <router-view name="header"></router-view>

        <div class="container">
            <!-- 左边区域 -->
            <router-view name="left"></router-view>
            <!-- 主区域 -->
            <router-view></router-view>
        </div>
    </div>

</template>

<script>

    export default {

        data() {
            return {}
        },
        methods: {

        }
    }
</script>

<style>
    html,
    body {
        margin: 0;
        padding: 0;
    }

    .header {
        background-color: orange;
        height: 80px;
    }

    h1 {
        margin: 0;
        padding: 0;
        font-size: 16px;
    }

    .container {
        display: flex;
        height: 600px;
    }

    .left {
        background-color: lightgreen;
        flex: 2;
    }

    .main {
        background-color: lightpink;
        flex: 8;
    }
</style>