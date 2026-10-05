import { User } from "../models/user.model.js";
import { ApiErrors } from "../utils/api-errors.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { emialVerificationMailgenContent, sendEmail } from "../utils/mail.js";


const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiErrors(500, "something went wrong while generating access token")
    }
}


const registerUser = asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        throw new ApiErrors(409, `User with ${email} or ${username} already exists`);
    }

    const user = await User.create({
        email,
        password,
        username,
        isEmailVerified: false
    })

    const { unhashToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;

    await user.save({ validateBeforeSave: false });

    await sendEmail({
        email: user?.email,
        subject: "Please verify your email",
        mailgenContent : emialVerificationMailgenContent(user.username, `${req.protocol}://${req.get("host")}/api/v1/users/
        verify-email/${unhashToken}`)
    })

    const createdUser = await User.findById(user._id)
    .select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry")

    if(!createdUser){
        throw new ApiErrors(500,"Something went wrong while registering the user");
    }

    return res.status(201).json(new ApiResponse(200,{user: createdUser},
        "User registered Successfully and verification email has been sent on your email"));
})

export {registerUser}