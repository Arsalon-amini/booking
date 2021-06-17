export const createConnectAccount = async (req, res) => {
    console.log("Outcome of middleware fn expressJwt", req.user)
    console.log("You hit create connect endpoint");
}