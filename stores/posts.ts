import {type Comment, type CommentsResp, type Post, type PostResp, type PostsResp, Reaction} from "~/types/Posts"

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
        // Загрузка поста по id
        async fetchPost(url: string) {
            await this.fetchWrapper(url, async (url) => {
                const response = await fetch(url)
                if (!response.ok) throw new Error("failed to fetch post")
                const post: PostResp = await response.json()
                this.setPosts([post])
            })
        },
        // Загрузка всех постов
        async fetchPosts(url: string) {
            await this.fetchWrapper(url, async (url) => {
                const response = await fetch(url)
                if (!response.ok) throw new Error("failed to fetch posts")
                const data: PostsResp = await response.json()
                this.setPosts(data.posts)
            })
        },
        // Загрузка комментариев к посту
        async fetchComments(url: string) {
            await this.fetchWrapper(url, async (url) => {
                const response = await fetch(url)
                if (!response.ok) throw new Error("failed to fetch comments")
                let data: CommentsResp = await response.json()
                this.comments = data.comments
            })
        },
        // Обертка для обработки ошибок и установки состояния загрузки
        async fetchWrapper(url: string, fetcher: (url: string) => Promise<void>) {
            this.setError(null)
            this.setLoading(true)
            try {
                await fetcher(url)
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
        // Оставление реакции на пост
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
            // Находим пост по id
            const post = this._posts.find(post => post.id === postId)

            if (!post) return

            const prevReaction = post.reacted

            // Если до этого был лайк или дизлайк, то убираем его
            if (prevReaction === Reaction.like) {
                post.reactions.likes -= 1
            } else if (prevReaction === Reaction.dislike) {
                post.reactions.dislikes -= 1
            }

            // Устанавливаем реакцию на пост как "не поставлено"
            post.reacted = Reaction.none
        },
        // Удаление комментария локально
        removeComment(commentId: number) {
            if (!this.deletedCommentIds.includes(commentId)) {
                this.deletedCommentIds.push(commentId)
            }
        },
        // Восстановление удаленного комментария локально
        returnComment(commentId: number) {
            const index = this.deletedCommentIds.indexOf(commentId)
            if (index !== -1) {
                this.deletedCommentIds.splice(index, 1)
            }
        }
    },
})