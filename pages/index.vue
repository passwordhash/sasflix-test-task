<script setup lang="ts">
import {useFetch} from "#app/composables/fetch";
import type {GetPostsResp} from "~/types/Posts";

const uri = useRuntimeConfig().public.apiBaseUrl + '/posts';

const { data: resp } = await useFetch<GetPostsResp>(uri)
</script>

<template>
    <div>
        <div v-if="resp" v-for="p in resp.posts">
            <PostCard :post="p"/>
        </div>
    </div>
</template>

<style scoped>

</style>