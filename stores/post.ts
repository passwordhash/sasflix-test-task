import type {Post, PostsResp} from "~/types/Posts";

export const usePostsStore = defineStore("posts", {
    state: () => ({
        posts: [] as Post[],
        isLoading: false,
        error: null as string | null
    }),
    actions: {
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
        }
    }
})