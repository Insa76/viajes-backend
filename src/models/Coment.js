import { Schema, model } from "mongoose";

const ComentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: "Unknown",
    },
    year: {
      type: Number,
      default: new Date(Date.now()).getFullYear(),
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ComentModel = model("Coment", ComentSchema);
