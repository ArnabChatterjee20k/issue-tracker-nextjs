import mongoose, { Schema, mongo } from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "in progress", "closed"],
      default: "open",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required:true
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const issues = mongoose.models.issues || mongoose.model("issues", issueSchema);
export default issues;
