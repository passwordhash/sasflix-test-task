<script setup lang="ts">
import type {Post} from "~/types/Posts";

// Получаем данные из родительского компонента типа Post
const { post } = defineProps<{post: Post}>()

</script>

<template>
    <div class="post-card">
        <h2 class="post-card__title">{{ post.title }}</h2>
        <div class="post-card__body">{{ post.body }}</div>
        <div class="post-card__footer">
            <div class="post-card__reactions">
                <div class="post-card__likes reaction reaction_left reaction_active">
                    <img class="reaction__icon" src="/images/icon_like.svg" alt="like" />
                    <span class="reaction__react">Like</span>
                    <span class="reaction__value">{{ post.reactions.likes }}</span>
                </div>
                <div class="post-card__comments reaction reaction_right">
                    <img class="reaction__icon" src="/images/icon_trash.svg" alt="comment" />
                    <span class="reaction__react">Trash</span>
                    <span class="reaction__value">{{ post.reactions.dislikes }}</span>
                </div>
            </div>
            <div class="post-card__open">Open comments</div>
            <div class="post-card__date">Today</div>
            <div class="post-card__tags tags">
                <div class="tag__item">history</div>
                <div class="tag__item">american</div>
                <div class="tag__item">crime</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../assets/scss/variables.scss';

.post-card {
    color: $text-color;
    margin-bottom: 32px;
    &__title {
        font-size: 28px;
        font-weight: bold;
        margin: 0 0 16px;
    }
    &__body {
        font-size: 20px;
        margin-bottom: 24px;
    }
    &__footer {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        > div {
            margin-right: 8px;
        }
    }
    &__reactions {
        display: flex;
    }
    &__likes {
        cursor: pointer;
        margin-right: 1px;
    }
    &__comments {
        cursor: pointer;
    }
    &__open {
        color: $accent-color;
        cursor: pointer;
        position: relative;
        &:after {
            content: "";
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 0.5px;
            background-color: $accent-border-color;
            transform: scaleY(0.5);
        }
    }
    &__date {
        color: $text-color-transparent;
    }
}
</style>