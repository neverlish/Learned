import { Box, Button, Card, Divider, Input, Space, Text } from "@mantine/core";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, Link, useNavigation } from "@remix-run/react";
import qs from "qs";
import supabase from "~/models/supabase";
import { createUser } from "~/models/user.service";

interface InputData {
  name: string;
  email: string;
  password: string;
}

export const action: ActionFunction = async ({ request }) => {
  const inputData = qs.parse(await request.text()) as unknown as InputData;

  const { data, error } = await supabase.auth.signUp({
    ...inputData,
    options: {
      data: {
        name: inputData.name,
      },
    },
  });

  console.log(data, error);

  if (error) {
    return json({
      error: true,
      message: {
        title: "회원가입 실패",
        message: error.message,
        color: "red",
      },
    });
  }
	await createUser(data.user?.id as string, inputData.name);

  return redirect("/auth/sign-in");
};

export default function SignUp() {
  const navigation = useNavigation();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Text weight={500}>회원가입</Text>
        <Divider my="md" />
        <Form method="post">
          <Input
            name="name"
            type="text"
            variant="filled"
            placeholder="닉네임"
            disabled={navigation.state === "submitting"}
          />
          <Space h="sm" />
          <Input
            name="email"
            type="email"
            variant="filled"
            placeholder="이메일"
            disabled={navigation.state === "submitting"}
          />
          <Space h="sm" />
          <Input
            name="password"
            type="password"
            variant="filled"
            placeholder="비밀번호"
            disabled={navigation.state === "submitting"}
          />
          <Space h="sm" />
          <Button
            type="submit"
            fullWidth
            radius="md"
            loading={navigation.state === "submitting"}
          >
            회원가입
          </Button>
          <Space h="sm" />
          <Link to="/auth/sign-in">
            <Button
              variant="light"
              fullWidth
              radius="md"
              disabled={navigation.state === "submitting"}
            >
              로그인
            </Button>
          </Link>
        </Form>
      </Card>
    </Box>
  );
}