import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    photo: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    coments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Coment",
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const PostModel = model("Post", PostSchema);
