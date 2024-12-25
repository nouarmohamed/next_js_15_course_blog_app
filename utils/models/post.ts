import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    createAt:{
        type: Date,
        default: Date.now
    }
})

const Post = models.Post || model('Post', PostSchema)
export default Post