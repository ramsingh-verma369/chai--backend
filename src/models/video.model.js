import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
    {
        videoFile: {
            type: String,  // cloudinary url
            required: true,
        },
        thumbnail: {
            type:String, //cloudinary url
            required:true,
        },
        title: {
            type: String, 
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        isPublised: {
            type: Boolean,
            default: true,
        },
        ower: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },


    },{timestamps:true})

    videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video",vidoSchmea);