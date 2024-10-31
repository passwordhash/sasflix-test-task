import {type Post, type PostsResp, Reaction} from "~/types/Posts"

export const usePostsStore = defineStore("posts", {
    state: () => ({
        posts: [] as Post[] | [],
        isLoading: false,
        error: null as string | null,
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

                const data: Post = await response.json()
                this.setPosts([data])
            } catch (e: any) {
                this.setError(e.message)
            } finally {
                this.setLoading(false)
            }
        },
        async fetchPosts(url: string) {
            this.setError(null)
            this.setLoading(true)
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error("failed to fetch posts")
                }

                const data: PostsResp = await response.json()
                this.setPosts(data.posts)
            } catch (e: any) {
                this.setError(e.message)
            } finally {
                this.setLoading(false)
            }
        },
        setPosts(posts: Post[]) {
            this.posts = posts.map(post => structuredClone(post))
        },
        setLoading(loading: boolean) {
            this.isLoading = loading
        },
        setError(error: string | null) {
            this.error = error
        },
        reactPost(postId: number, reaction: Reaction) {
            // Находим пост по id
            const post = this.posts.find(post => post.id === postId)

            if (!post) return

            const prevReaction = post.reacted
            // Если пользователь уже поставил реакцию, то убираем ее
            if (prevReaction === reaction) {
                return
            }

            switch (reaction) {
                case Reaction.like:
                    post.reacted = Reaction.like
                    break
                case Reaction.dislike:
                    post.reacted = Reaction.dislike
                    break
            }
        },
        undoReaction(postId: number) {
            const post = this.posts.find(post => post.id === postId)

            if (!post) return

            post.reacted = null
        }
    }
})