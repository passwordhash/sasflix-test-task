<script setup lang="ts">
import {type Post, Reaction} from "~/types/Posts";
import PostTag from "~/components/PostTag.vue";
import LikeIcon from "~/components/icons/LikeIcon.vue"
import DislikeIcon from "~/components/icons/DislikeIcon.vue"


// Определяем типы пропсов
interface Props {
    post: Post
    isOpenPostNeeded?: boolean
    reacted: Reaction
}
// Получаем пропсы из родительского компонента
const { post, isOpenPostNeeded = true, reacted = Reaction.none } = defineProps<Props>()

console.log("reacted:" ,reacted)

</script>

<template>
    <div class="post-card">
        <h2 class="post-card__title">{{ post.title }}</h2>
        <div class="post-card__body">{{ post.body }}</div>
        <div class="post-card__footer">
            <div class="post-card__reactions">
                <div
                    class="post-card__likes reaction reaction__like"
                    :class="{ 'active': reacted === Reaction.like }"
                    @click="$emit('react', post.id, Reaction.like)">
                    <LikeIcon
                        class="reaction__icon"
                        :is-light="reacted === Reaction.like" />
                    <span class="reaction__react">Like</span>
                    <span class="reaction__value">{{ post.reactions?.likes }}</span>
                </div>
                <div
                    class="post-card__comments reaction reaction__dislike"
                    :class="{ 'active': reacted === Reaction.dislike }"
                    @click="$emit('react', post.id, Reaction.dislike)">
                    <DislikeIcon
                        class="reaction__icon"
                        :is-light="reacted === Reaction.dislike" />
                    <span class="reaction__react">Trash</span>
                    <span class="reaction__value">{{ post.reactions?.dislikes }}</span>
                </div>
            </div>
            <div v-if="isOpenPostNeeded" class="post-card__open accent-link">
                <NuxtLink :to="`/posts/${post.id}`">Open post</NuxtLink>
            </div>
            <div class="post-card__date text-light">Today</div>
            <div class="post-card__tags">
                <PostTag
                    v-for="(tag, i) in post.tags"
                    :key="tag"
                    :is-first="i === 0"
                    :tag="tag"  />
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
    &__tags {
        display: flex;
        align-items: center;
        & > * {
            margin-right: 4px;
        }
    }
}
</style>