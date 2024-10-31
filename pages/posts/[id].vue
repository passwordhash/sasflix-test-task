<script setup lang="ts">
import {useAsyncData} from "#app";
import {usePostDetailsStore} from "~/stores/postDetails";

// Имитация удаления комментария
const  deletedComments = ref<number[]>([])

// Получаем id поста из роута
const { id: postId } = useRoute().params

// Получаем базовый uri из конфига
const baseUri = useRuntimeConfig().public.apiBaseUrl

// Формируем uri для запроса поста и комментариев
const postUri = `${baseUri}/posts/${postId}`
const commentsUri = `${baseUri}/posts/${postId}/comments`

// Получаем стор
const store = usePostDetailsStore()

// Получаем пост и комментарии
await useAsyncData("post", () => store.fetchPost(postUri).then(() => true))
await useAsyncData("comments", () => store.fetchComments(commentsUri).then(() => true))

// Устанавливаем мета-теги для страницы
definePageMeta({
    title: "Sasflix | Страница поста",
    description: "Пост с поxдробной информацией"
})

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
</script>

<template>
    <div>
        <div  class="post-page__wrapper">
            <!-- Пост -->
            <div  class="post-page__post">
                <PostCard v-if="store.post" :post="store.post" :is-open-post-needed="false"/>
                <div v-else>
                    <h2 class="alert-msg">Failed to load post</h2>
                </div>
            </div>
            <!-- Комментарии -->
            <div class="post-page__comments">
                <div  v-if="store.comments" class="post-comments">
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