import React from "react";
import { resend } from "@/lib/resend";
import { VerificationEmail } from "../../emails/verificationEmail";
import { ApiResponse } from "../types/apiResponse";

export const sendVerificationEmail = async (
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "NextAuth Authentication verification code",
      html: `
        <h1>Hello 👋, ${username}!</h1>
        <p>You requested a One-Time Password (OTP) to access your account.</p>
        <p>Your OTP is: <strong>${verifyCode}</strong></p>
        <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
        <br/>
        <p>If you did not request this, please ignore this email</p>
      `,
    });
    return { success: true, message: "verification email send successfully" };
  } catch (err) {
    console.error("Error sending verification email", err);
    return { success: false, message: "failed to send verification email" };
  }
};
