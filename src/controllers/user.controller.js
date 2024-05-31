import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js "
import { ApiResponse } from "../utils/ApiResponse.js"
const regiserUser = asyncHandler(async (req, res) => {
    // get user detail from frontend
    const {fullName,email,username,password} =  req.body;
    console.log("email",email);


    // validation - not empty
    // if(fullName === "") {
    //     throw new ApiError(400,"fullname is required")
    // }

    if(
        [fullName,email,username,password].some((field) =>
        field?.trim() ==="")
    ) {
        throw new ApiError(400, "All fields are compulsary")
    }

    // check if user already exists: username , email
    const existedUser = User.findOne({
        $or:[{ username }, { email }]
    })
    if(existedUser) {
        throw new ApiError(409, "User with email or username already exist")
    }

    // check for cover images, check for avatar
    const avatarLocalpath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0].path;

    if(!avatarLocalpath) {
        throw new ApiError(400,"Avatar file is required")
    }
    // upload them to cloudinary,avatar
    const avatar = await uploadOnCloudinary(avatarLocalpath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar) {
        throw new ApiError(400,"Avatar file is required") 
    }

    // create user object - create entry in db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken"
    ) 
    // check for the user creation
    if(!createdUser) {
        throw new ApiError(400,"Something went wrong while registering the user")
    }

    // return response
    return res.json(201).json(
        new ApiResponse(200,createdUser, "User Registered Successfully")
    )


})

export {regiserUser}