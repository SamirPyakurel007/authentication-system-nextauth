import React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Button,
  Hr,
} from "@react-email/components";

type VerificationEmailProps = {
  username: string;
  otp: string;
};

export const VerificationEmail = function ({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head>
        <title>Verification Code</title>
      </Head>
      <Preview>Your One-Time Password (OTP)</Preview>
      <Body>
        <Container>
          <Section>
            <Heading>Hello, {username}!</Heading>
            <Text>
              You requested a One-Time Password (OTP) to access your account.
            </Text>
            <Text>{otp}</Text>
            <Text>
              This OTP is valid for the next 10 minutes. Please do not share it
              with anyone.
            </Text>
            <Hr />
            <Text>If you did not request this, please ignore this email.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
