<template>
    <body>
    <header class="header">
        <h1 class="header__title">ikakprosto.ru</h1>
    </header>
    <main>
        <slot />
    </main>
    </body>
</template>

<style  lang="scss">
@import "../assets/scss/variables.scss";

.header {
    text-align: center;
    &__title {
        color: $accent-color;
        font-weight: bold;
        font-size: 40px;
    }
}
</style>