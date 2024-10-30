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
    <div class="post-page__wrapper">
        <div class="post-page__post">
            <PostCard v-if="post" :post="post" :is-open-post-needed="false"/>
            <!--        TODO:-->
            <h2 v-else>
                Не удалось загрузить пост
            </h2>
        </div>
        <div class="post-page__comments">
            <div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>