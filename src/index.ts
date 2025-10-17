import { Post } from "./components/bussiness/post/Post";

console.log('sadasd');

const posts: Post[] = [];
const postsEl = document.querySelectorAll('article.post');

if (postsEl) {
    postsEl.forEach((el) => {
        const post = new Post({
            element: el as HTMLElement,
        });
        posts.push(post);
    });
}

