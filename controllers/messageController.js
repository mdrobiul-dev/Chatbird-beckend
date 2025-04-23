const messageSend = async (req, res) => {
    try {
    return res.send("hello world")
    } catch (error) {
        res.status(500).send("server error")
    }
}

module.exports =  { messageSend }