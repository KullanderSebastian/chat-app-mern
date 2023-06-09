import mongoose from "mongoose";

const friendsSchema = new mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    status: {
        type: Number,
        enums: [
            0,      //add friend
            1,      //requested
            2,      //pending
            3,      //friends
        ]
    }
}, {timestamps: true});

const Friend = mongoose.model("Friends", friendsSchema);

export default Friend;
