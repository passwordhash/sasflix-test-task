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

// Получаем сторы
const store = usePostsStore()

// Получаем пост и комментарии
// await useAsyncData("post", () => store.fetchPost(postUri).then(() => true))
const { data: post } = useAsyncData('posts', async () => {
  await store.fetchPost(postUri)
  return store.getPostById(postId)
})
await useAsyncData("comments", () => store.fetchComments(commentsUri).then(() => true))

const removeComment = (commentId: number) => {
    if (!deletedComments.value.includes(commentId)) {
        deletedComments.value.push(commentId)
    }
}

const returnComment = (commentId: number) => {
    const index = deletedComments.value.indexOf(commentId)
    if (index !== -1) {
        deletedComments.value.splice(index, 1)
    }
}

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
                            v-for="comment in store.comments"
                            :key="comment.id"
                            :comment="comment"
                            @removeComment="removeComment"
                            @returnComment="returnComment"
                            :is-deleted="deletedComments.includes(comment.id)"
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