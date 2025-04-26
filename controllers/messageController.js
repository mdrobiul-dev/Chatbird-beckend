const conversationSchema = require("../modal/conversationSchema")
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

        const existingConversation = await conversationSchema.findById({_id : conversationId})

        if(!existingConversation) {
            return res.status.send({error : "no conversation"})
        }

        const message = new messageSchema({
            sender: req.user._id,
            reciever : reciverId,
            content,
            conversation : existingConversation._id,
        })

       await message.save()

       await conversationSchema.findByIdAndUpdate(existingConversation._id, {lastmessage : message})

       global.io.emit("new_message", {message , conversationId : existingConversation._id})

    return res.send(message)
    } catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}

const getmessage = async (req, res) => {
   try {
    const {conversationId} = req.params

    const message = await messageSchema.find({conversation : conversationId})

   return res.status(200).send({success : message})

   } catch (error) {
    console.log(error)
      res.status(500).send({error : "server error"})
   }
}

module.exports =  { messageSend , getmessage}