import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/userModel";
import { z } from "zod";
import { usernameValidationSchema } from "@/schema/schemas";

const UsernameQuerySchema = z.object({
  username: usernameValidationSchema,
});

export async function GET(request: Request) {
  await dbConnect();

  //localhost:3000/api/checkUsernameUnique?username=samir
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };

    //validate with zod
    const result = UsernameQuerySchema.safeParse(queryParam);
    console.log(result); //todo:remove

    if (!result.success) {
      //optional
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message: "invalid query parameter",
        },
        {
          status: 400,
        }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "username already taken",
        },
        {
          status: 400,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "username is unique",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Error checking username", err);
    return Response.json(
      {
        success: false,
        message: "error checking username",
      },
      {
        status: 500,
      }
    );
  }
}
