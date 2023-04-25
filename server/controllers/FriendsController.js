import Friend from "../models/friends.model.js";
import User from "../models/user.model.js";

class FriendsController {
    async addFriend(req, res) {
        try {
            let userA = await User.findOne({
                username: req.body.requester,
            });

            let userB = await User.findOne({
                username: req.body.recipient,
            });

            if (userA || userB) {
                let friendA = new Friend();
                let friendB = new Friend();

                friendA.requester = userA._id;
                friendA.recipient = userB._id;
                friendA.status = 1;

                friendB.recipient = userA._id;
                friendB.requester = userB._id;
                friendB.status = 2;

                await friendA.save();
                await friendB.save();

                return res.status(200).send([friendA, friendB]);
            }
        } catch(error) {
            console.error(error);
        }
    }

    async updateUsersFriendsRef(req, res) {
        try {
            let userA = await User.findOneAndUpdate(
                { _id: req.body.userAId },
                { $push: { friends: req.body.docA._id }}
            );

            let userB = await User.findOneAndUpdate(
                { _id: req.body.userBId },
                { $push: { friends: req.body.docB._id }}
            );

            return res.status(200).send([userA, userB]);
        } catch(error) {
            console.error(error);
        }
    }
}

export default FriendsController;
