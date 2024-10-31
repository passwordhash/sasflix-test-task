<script setup lang="ts">

// Объявляем пропсы для компонента
const { isFirst, tag } = defineProps<{
    isFirst: boolean,
    tag: string
}>()
</script>

<template>
    <div :class="{'post-tag_first': isFirst}" class="post-tag">
        <img v-if="isFirst" src="/images/tag_tail.svg"  alt="tail"/>
        <div>{{ tag }}</div>
    </div>
</template>

<style scoped lang="scss">
@import '../assets/scss/variables.scss';

.post-tag {
    display: flex;
    align-items: center;
    height: 18px;
    div {
        height: 100%;
        border-radius: 3px;
        display: flex;
        align-items: center;
        padding: 1px 4px;
        background-color: $background-color-transparent;
    }
}
.post-tag_first {
    div {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
}
</style>
