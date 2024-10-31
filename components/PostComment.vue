<script setup lang="ts">
import {type Comment} from '~/types/Posts';

// Сообщение о том, что комментарий удален
const COMMENT_DELETED_MSG = "This comment has been deleted."

// Получаем пропсы из родительского компонента
const { comment, isDeleted = false } = defineProps<{
    comment: Comment,
    isDeleted?: boolean
}>()

</script>

<template>
    <div class="comment">
        <div class="comment__user-img">
            <img src="/images/user-img_placeholder.svg" alt="user-img">
        </div>
        <div class="comment__content">
            <div class="comment__username">{{ comment.user.username }}</div>
            <div class="comment__body">
                <span v-if="!isDeleted" class="comment__text">{{ comment.body }}</span>
                <span v-else class="comment__deleted">
                    <span class="comment__text">{{ COMMENT_DELETED_MSG }}</span>
                    <span @click="$emit('returnComment', comment.id)" class="comment__return accent-link">Return</span>
                </span>
            </div>
            <div v-if="!isDeleted" class="comment__additionals">
                <span class="comment__date text-light">Today</span>
                <span @click="$emit('removeComment', comment.id)" class="comment__delete accent-link">Delete</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../assets/scss/variables';

.comment {
    display: flex;
    align-items: start;
    color: $text-color;
    margin-bottom: 24px;
    &:last-child {
        margin-bottom: 0;
    }
    // .comment__user-img
    &__user-img {
        height: 46px;
        width: 46px;
    }
    // .comment__content
    &__content {
        margin-left: 8px;
        font-size: 20px
    }
    // .comment__username
    &__username {
        font-weight: 600;
        margin-bottom: 6px;
    }
    // .comment__body
    &__body {
        margin-bottom: 10px;
    }
    // .comment__return
    &__return {
        margin-left: 8px;
    }
    // .comment__additionals
    &__additionals {
        font-size: 14px;
    }
    // .comment__date
    &__date {
        margin-right: 20px;
    }
}
</style>