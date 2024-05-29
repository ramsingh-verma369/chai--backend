import {asyncHandler} from "../utils/asyncHandler.js";


const regiserUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "ok" 
    })
})

export {regiserUser}