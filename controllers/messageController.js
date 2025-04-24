const messageSchema = require("../modal/messageSchema")

const messageSend = async (req, res) => {
    try {

        const {reciverId , content, conversationId} = req.body

        if(!reciverId) {
            return res.status(400).send({error : "reciverId is required"})
        }

        if(!content) {
            return res.status(400).send({error : "content is required"})
        }

        if(!conversationId) {
            return res.status(400).send({error : "conversationId is required"})
        }

        const message = new messageSchema({
            sender: req.user._id,
            reciever : reciverId,
            content,
            conversation : conversationId,
        })

    return res.send("hello world")
    } catch (error) {
        res.status(500).send("server error")
    }
}

module.exports =  { messageSend }