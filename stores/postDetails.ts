import type {CommentsResp, Post, Comment, PostResp} from "~/types/Posts";
import {Reaction} from "~/types/Posts"
import {sw} from "cronstrue/dist/i18n/locales/sw"

export const usePostDetailsStore = defineStore("postDetail", {
    state: () => ({
        post: null as Post | null,
        comments: null as Comment[] | null,
        isLoading: false,
        error: null as string | null
    }),
    actions: {
        async fetchPost(url: string) {
            this.setError(null)
            this.setLoading(true)
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error("failed to fetch post")
                }
                let data: PostResp = await response.json()
                this.setPost(data)
            } catch (e: any) {
                this.setError(e.message)
            } finally {
                this.setLoading(false)
            }
        },
        async fetchComments(url: string) {
            this.setError(null)
            this.setLoading(true)
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error("failed to fetch comments")
                }
                let data: CommentsResp = await response.json()
                console.log("data ", data)
                this.comments = data.comments
            } catch (e: any) {
                this.setError(e.message)
            } finally {
                this.setLoading(false)
            }
        },
        setPost(post: Post) {
            this.post = structuredClone(post)
        },
        setLoading(loading: boolean) {
            this.isLoading = loading
        },
        setError(error: string | null) {
            this.error = error
        },
        reactPost(reaction: Reaction) {
            if (!this.post) return

            const prevReaction = this.post.reacted
            // Если пользователь нажал на ту же реакцию, что и раньше, то отменяем ее
            if (prevReaction === reaction) {
                this.undoReaction()
                return
            }

            switch (reaction) {
                case Reaction.like:
                    this.post.reactions.likes += 1
                    // Если пользователь изменил свою реакцию, то уменьшаем количество предыдущей реакции
                    this.post.reactions.dislikes -= prevReaction === Reaction.dislike ? 1 : 0
                    this.post.reacted = Reaction.like
                    break
                case Reaction.dislike:
                    this.post.reactions.dislikes += 1
                    // Если пользователь изменил свою реакцию, то уменьшаем количество предыдущей реакции
                    this.post.reactions.likes -= prevReaction === Reaction.like ? 1 : 0
                    this.post.reacted = Reaction.dislike
                    break
            }
        },
        undoReaction() {
            if (!this.post) return

            const currReact = this.post.reacted
            switch (currReact) {
                case Reaction.like:
                    this.post.reactions.likes -= 1
                    break
                case Reaction.dislike:
                    this.post.reactions.dislikes -= 1
                    break
            }

            this.post.reacted = Reaction.none
        }
    },
})