import Post from "@resources/post/post.interface";
import PostModel from "@resources/post/post.model";

class PostService {
    private post = PostModel;

    public async create(title: string, body: string): Promise<Post> {
        try {
            const post = this.post.create({title, body});
            return post;
        } catch (error) {
            throw new Error('Unable to create post');
        }
    }
}

export default PostService;