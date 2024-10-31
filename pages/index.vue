<script setup lang="ts">
import {usePostsStore} from "~/stores/posts";
import {useAsyncData} from "#app";
import {type Reaction} from "~/types/Posts"

// Собираем URL для запроса
const postsUri = useRuntimeConfig().public.apiBaseUrl + '/posts';

// Инициализируем хранилище
const store = usePostsStore()

// Получаем данные
await useAsyncData("posts", () => store.fetchPosts(postsUri).then(() => true))

const reactPost = (id: number, reaction: Reaction) => {
    store.reactPost(id, reaction)
}
</script>

<template>
    <div class="main__container container">
        <div v-for="p in store.getPosts.slice(0, 5)">
            <PostCard @react="reactPost"  :reacted="p.reacted" :post="p"/>
        </div>
        <h3 class="alert-msg" v-if="store.error">Error loading posts</h3>
        <!-- Не имеет особого смысла при ssr -->
        <h3 class="alert-msg" v-if="store.isLoading">Loading posts ...</h3>
    </div>
</template>