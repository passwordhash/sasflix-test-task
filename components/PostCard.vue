<script setup lang="ts">
import type {Post} from "~/types/Posts";
import type {PropType} from "vue";

const {post} = defineProps<{post: Post}>()
</script>

<template>
    <div class="post-card">
        <div class="post-card__title">{{ post.title }}</div>
        <div class="post-card__body" >{{ post.body }}</div>
        <div class="post-card__footer">
            <div class="post-card__reactions">
                <div class="post-card__likes">
                    <img src="/images/icon_like.svg" alt="like" />
                    <span>Like {{ post.reactions.likes }}</span>
                </div>
                <div class="post-card__comments">
                    <img src="/images/icon_trash.svg"  alt="trash" />
                    <span>Trash {{ post.reactions.dislikes }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>