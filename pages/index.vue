<script setup lang="ts">
import {usePostsStore} from "~/stores/post";
import {useAsyncData} from "#app";

// Собираем URL для запроса
const postsUri = useRuntimeConfig().public.apiBaseUrl + '/posts';

// Инициализируем хранилище
const store = usePostsStore()

// Получаем данные
await useAsyncData("posts", () => store.fetchPosts(postsUri).then(() => true))
</script>

<template>
    <div class="main__container container">
        <div v-for="p in store.posts.slice(0, 5)">
            <PostCard :post="p"/>
        </div>
        <h3 class="alert-msg" v-if="store.error">Error loading posts</h3>
        <!-- Не имеет особого смысла при ssr -->
        <h3 class="alert-msg" v-if="store.isLoading">Loading posts ...</h3>
    </div>
</template>