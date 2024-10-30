<script setup lang="ts">
import {type CommentsResp, type PostResp} from '~/types/Posts';

// Имитация удаления комментария
const  deletedComments = ref<number[]>([])

// Получаем id поста из роута
const { id: postId } = useRoute().params

// Получаем базовый uri из конфига
const baseUri = useRuntimeConfig().public.apiBaseUrl

// Формируем uri для запроса поста и комментариев
const postUri = `${baseUri}/posts/${postId}`
const commentsUri = `${baseUri}/posts/${postId}/comments`

// Получаем пост и комментарии
const { data: post } = await useFetch<PostResp>(postUri)
const { data: commentsData } = await useFetch<CommentsResp>(commentsUri)

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
    <div class="post-page__wrapper">
        <div class="post-page__post">
            <PostCard v-if="post" :post="post" :is-open-post-needed="false"/>
            <!--        TODO:-->
            <h2 v-else>
                Не удалось загрузить пост
            </h2>
        </div>
        <div v-if="commentsData" class="post-page__comments post-comments">
            <h2 class="post-comments__header">{{ commentsData.comments.length }} comments</h2>
            <p class="post-comments__wrapper">
                <PostComment
                    v-for="comment in commentsData.comments"
                    :key="comment.id"
                    :comment="comment"
                    @removeComment="removeComment"
                    @returnComment="returnComment"
                    :is-deleted="deletedComments.includes(comment.id)"
                />
            </p>
        </div>
        <!--        TODO:-->
        <h2 v-else>Не удалось загрузить комментарии</h2>
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