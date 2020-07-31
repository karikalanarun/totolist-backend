const socketIO = require("socket.io")
const { getFriendsIds, getUser } = require("./user/user.utils")

module.exports = server => {
    const io = socketIO(server)
    io.on("connection", (socket) => {
        socket.on("connectToAllChannels", async (userId) => {
            try {
                const ids = (await getFriendsIds(userId)).friends.map(id => `${id}-friends`)
                ids.forEach(id => socket.join(id)) // joining to rooms
                socket.join(`${userId}-direct`)
                console.log("joined to friends rooms")
            } catch (err) {
                console.log("unhandled err ::: ", err)
                socket.emit("server:error", "Something went wrong")
            }
        })

        socket.on("friend-request", async ({ raised_to, raised_by }) => {
            try {
                const user = await getUser(raised_by);
                console.log("friend-request event emitted")
                socket.to(`${raised_to}-direct`).emit("friend-request", user)
            } catch (error) {
                console.log("unhandled err ::: ", error)
                socket.emit("server:error", "Something went wrong")
            }
        })

        socket.on("todo-list", async ({ userId, title, owner, event }) => {
            try {
                const user = await getUser(userId);
                const _owner = await getUser(owner)
                console.log("`${userId}-friends` ::: ", `${userId}-friends`)
                socket.to(`${userId}-friends`).emit("todo-list", { user, title, event, owner: _owner })
                console.log('todo list event fired')
            } catch (error) {
                console.log("unhandled err ::: ", error)
                socket.emit("server:error", "Something went wrong")
            }
        })
        // socket.on("update_issue", (issue_id, msg) => {
        //     console.log("issue_id :: ", issue_id, "msg ::: ", msg)
        //     socket.to(issue_id).emit("issue_updated", msg)
        // })
    })
}