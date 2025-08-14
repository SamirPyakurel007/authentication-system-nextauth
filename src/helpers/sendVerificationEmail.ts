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
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2c3e50; font-size: 24px;">Hello 👋, ${username}!</h1>
          
          <p style="line-height: 1.5; margin: 16px 0;">
            You requested a One-Time Password (OTP) to access your account.
          </p>
          
          <p style="line-height: 1.5; margin: 16px 0;">
            Your OTP is:
            <span style="display: inline-block; background-color: #f4f4f4; padding: 8px 12px; border-radius: 4px; font-size: 18px; font-weight: bold; letter-spacing: 2px; color: #000;">
              ${verifyCode}
            </span>
          </p>
          
          <p style="line-height: 1.5; margin: 16px 0; color: #e74c3c;">
            This OTP is valid for 10 minutes. Do not share it with anyone.
          </p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p style="line-height: 1.5; margin: 0;">
            If you did not request this, please ignore this email.
          </p>
        </div>
      `,
    });
    return { success: true, message: "verification email send successfully" };
  } catch (err) {
    console.error("Error sending verification email", err);
    return { success: false, message: "failed to send verification email" };
  }
};
