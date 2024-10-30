<script setup lang="ts">
import {type CommentsResp, type PostResp} from '~/types/Posts';

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
</script>

<template>
    <div>
        <div>
            <h1>{{ post?.title }}</h1>
            <p>{{ post?.body }}</p>
        </div>
        <div>
            <h2>Комментарии</h2>
            <div v-for="comment in commentsData?.comments">
                <p>{{ comment.body }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>