import { resend } from "@/lib/resend";
import { VerificationEmail } from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/apiResponse";

export const sendVerificationEmail = async (
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Mystry message verification code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "verification email send successfully" };
  } catch (err) {
    console.error("Error sending verification email", err);
    return { success: false, message: "failed to send verification email" };
  }
};
