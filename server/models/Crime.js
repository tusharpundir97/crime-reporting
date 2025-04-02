import mongoose from "mongoose";

const crimeSchema = new mongoose.Schema(
      {
        title: {type: String, required:true},
        description: {type: String, required:true},
        location: {type: String, required:true},
        status: {type:String, enum: ["Pending", "In Progress", "Resolved"], default: "Pending"},
        reportedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        assignedTo: {type: mongoose.Schema.Types.ObjectId, ref: "User", default: null},

      },
      {timestamps: true}
);

export default mongoose.model("Crime",crimeSchema);