import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/userModel";
import { z } from "zod";
import { verifySchema } from "@/schema/schemas";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();

    verifySchema.safeParse({ code });

    //optional
    const decodedUsername = decodeURIComponent(username);

    const user = await UserModel.findOne({
      username: decodedUsername,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "user not found",
        },
        {
          status: 500,
        }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "account verified successfully",
        },
        {
          status: 200,
        }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message: "verification code has expired signUp again to get new code",
        },
        {
          status: 500,
        }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Incorrect verification code",
        },
        {
          status: 500,
        }
      );
    }
  } catch (err) {
    console.error("Error verifying user", err);
    return Response.json(
      {
        success: false,
        message: "Error verifying user",
      },
      {
        status: 500,
      }
    );
  }
}
