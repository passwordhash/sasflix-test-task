import {type Comment, type CommentsResp, type Post, type PostsResp, Reaction} from "~/types/Posts"

export const usePostsStore = defineStore("posts", {
    state: () => ({
        _posts: [] as Post[] | [],
        comments: null as Comment[] | null,
        deletedCommentIds: [] as number[],
        isLoading: false,
        error: null as string | null,
    }),
    getters: {
        getPostById: (state) => (id: number) => {
            return state._posts.find(post => post.id === id)
        },
        getPosts: (state) => {
            return state._posts
        }
    },
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
        async fetchComments(url: string) {
            this.setError(null)
            this.setLoading(true)
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error("failed to fetch comments")
                }
                let data: CommentsResp = await response.json()
                this.comments = data.comments
            } catch (e: any) {
                this.setError(e.message)
            } finally {
                this.setLoading(false)
            }
        },
        setPosts(posts: Post[]) {
            this._posts = posts.map(post => structuredClone(post))
        },
        setLoading(loading: boolean) {
            this.isLoading = loading
        },
        setError(error: string | null) {
            this.error = error
        },
        reactPost(postId: number, reaction: Reaction) {
            // Находим пост по id
            const post = this._posts.find(post => post.id === postId)
            if (!post) return
            const prevReaction = post.reacted
            // Если пользователь уже поставил реакцию, то убираем ее
            if (prevReaction === reaction) {
                this.undoReaction(postId)
                return
            }
            switch (reaction) {
                case Reaction.like:
                    post.reactions.likes += 1
                    // Если пользователь ставил дизлайк, то убираем его
                    post.reactions.dislikes -= prevReaction === Reaction.dislike ? 1 : 0
                    post.reacted = Reaction.like
                    break
                case Reaction.dislike:
                    post.reactions.dislikes += 1
                    // Если пользователь ставил лайк, то убираем его
                    post.reactions.likes -= prevReaction === Reaction.like ? 1 : 0
                    post.reacted = Reaction.dislike
                    break
            }
        },
        undoReaction(postId: number) {
            const post = this._posts.find(post => post.id === postId)

            if (!post) return

            const prevReaction = post.reacted

            // Если до этого был лайк или дизлайк, то убираем его
            if (prevReaction === Reaction.like) {
                post.reactions.likes -= 1
            } else if (prevReaction === Reaction.dislike) {
                post.reactions.dislikes -= 1
            }

            post.reacted = Reaction.none
        },
        removeComment(commentId: number) {
            if (!this.deletedCommentIds.includes(commentId)) {
                this.deletedCommentIds.push(commentId)
            }
        },
        returnComment(commentId: number) {
            const index = this.deletedCommentIds.indexOf(commentId)
            if (index !== -1) {
                this.deletedCommentIds.splice(index, 1)
            }
        }
    },
})