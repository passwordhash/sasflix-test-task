<script setup lang="ts">
import {useAsyncData} from "#app";
import type {Reaction} from "~/types/Posts"
import {usePostsStore} from "~/stores/posts"

// Устанавливаем мета-теги для страницы
useHead({
    title: "Sasflix | Страница поста",
    meta: [
        { name: "description", content: "Пост с подробной информацией" }
    ]
})

// Имитация удаления комментария
const  deletedComments = ref<number[]>([])

// Получаем id поста из роута
const {id : postIdParam} = useRoute().params
const postId = Number(postIdParam)

// Получаем базовый uri из конфига
const baseUri = useRuntimeConfig().public.apiBaseUrl

// Формируем uri для запроса поста и комментариев
const postUri = `${baseUri}/posts/${postIdParam}`
const commentsUri = `${baseUri}/posts/${postIdParam}/comments`

// Получаем стор
const store = usePostsStore()

// Получаем пост и комментарии
const { data: post } = useAsyncData('posts', async () => {
    await store.fetchPost(postUri)
    return store.getPostById(postId)
})
const { data: comments } = useAsyncData('comments', async () => {
    await store.fetchComments(commentsUri)
    return store.comments
})

const reactPost = (postId: number, reaction: Reaction) => {
    store.reactPost(postId, reaction)
}
</script>

<template>
    <div>
        <div  class="post-page__wrapper">
            <!-- Пост -->
            <div  class="post-page__post">
                <PostCard
                    v-if="post"
                    :post="post"
                    :is-open-post-needed="false"
                    :reacted="post.reacted"
                    @react="reactPost"
                />
                <div v-else>
                    <h2 class="alert-msg">Failed to load post</h2>
                </div>
            </div>
            <!-- Комментарии -->
            <div class="post-page__comments">
                <div v-if="store.comments" class="post-comments">
                    <h2 class="post-comments__header">{{ store.comments.length }} comments</h2>
                    <p  class="post-comments__wrapper">
                        <PostComment
                            v-for="comment in comments"
                            :key="comment.id"
                            :comment="comment"
                            @removeComment="() => store.removeComment(comment.id)"
                            @returnComment="() => store.returnComment(comment.id)"
                            :is-deleted="store.deletedCommentIds.includes(comment.id)"
                        />
                    </p>
                </div>
                <div v-else>
                    <h2 class="alert-msg">Failed to load comments</h2>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">
.post-comments {
    margin-top: 22px;
    &__header {
        font-size: 28px;
        font-weight: bold;
    }
}
</style>