import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const TodoSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: [true, "Please provide UserId"],
    },

    title: {
      type: String,
      required: [true, "Please provide Title"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
TodoSchema.plugin(mongoosePaginate);

TodoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
