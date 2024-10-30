export type Post = {
    id: number
    title: string
    body: string
    tags: string[]
    reactions: {
        "likes": number
        "dislikes": number
    }
    views: number
    userId: number

}

export type Comment = {
    id: number
    body: string
    postId: number
    user: {
        id: number
        username: string
        fullname: string
    }
}

export type PostResp = Post

export type PostsResp = {
    posts: Post[]
    total: number
    skip: number
    limit: number
}

export type CommentsResp = {
    comments: Comment[]
    total: number
    skip: number
    limit: number
}