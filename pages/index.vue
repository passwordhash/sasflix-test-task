<script setup lang="ts">
import {useFetch} from "#app/composables/fetch";
import type {PostsResp} from "~/types/Posts";

// Собираем URL для запроса
const uri = useRuntimeConfig().public.apiBaseUrl + '/posts';

// TODO: add error handling
// Получаем данные типа GetPostsResp
const { data: resp } = await useFetch<PostsResp>(uri)
</script>

<template>
    <div class="main__container container">
        <div v-for="p in resp?.posts.slice(0, 5)">
            <PostCard :post="p"/>
        </div>
    </div>
</template>