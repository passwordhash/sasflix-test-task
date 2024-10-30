<template>
    <header class="header">
        <NuxtLink to="/">
            <h1 class="header__title">ikakprosto.ru</h1>
        </NuxtLink>
    </header>
    <main>
        <slot />
    </main>
</template>

<style  lang="scss">
@import "../assets/scss/variables.scss";

.header {
    text-align: center;
    margin-top: 16px;
    margin-bottom: 48px;
    &__title {
        color: $accent-color;
        font-weight: bold;
        font-size: 40px;
    }
}
</style>
<script setup lang="ts">
</script>