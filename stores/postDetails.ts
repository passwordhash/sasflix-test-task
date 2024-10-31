import type {CommentsResp, Post, Comment, PostResp} from "~/types/Posts";
import {Reaction} from "~/types/Posts"

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

            switch (reaction) {
                case Reaction.like:
                    this.post.reacted = Reaction.like
                    break
                case Reaction.dislike:
                    this.post.reacted = Reaction.dislike
                    break
            }
        }
    }
})