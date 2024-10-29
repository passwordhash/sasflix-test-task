<script setup lang="ts">
import {useFetch} from "#app/composables/fetch";
import type {GetPostsResp, Post} from "~/types/Posts";

const uri = useRuntimeConfig().public.apiBaseUrl + '/posts';

const { data: resp } = await useFetch<GetPostsResp>(uri)
</script>

<template>
    <div>
        <div v-if="resp" v-for="p in resp.posts">
            <h3>{{p.title}}</h3>
        </div>
    </div>
</template>

<style scoped>

</style>