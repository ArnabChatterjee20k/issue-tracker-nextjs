import mongoose, { mongo } from "mongoose";

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
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const issues = mongoose.models.issues || mongoose.model("issues",issueSchema)
export default issues