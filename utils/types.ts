interface Params {
    id: string
}

interface ProfileProps {
    user: User;
    posts: Post[];
}

interface CardProps {
    id: string;
    title: string;
    content: string;
    author: string;
    authorId: string;
    authorImg: string;
    createAt: Date;
}

interface User {
    _id: string
    username: string
    email: string
    image: string
}

interface Post {
    _id: string
    title: string
    content: string
    author: User
    createAt: Date
}
