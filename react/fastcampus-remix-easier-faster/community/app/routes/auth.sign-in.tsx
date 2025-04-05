import { ActionIcon, Box, Button, Card, Divider, Group, Input, Space, Text } from "@mantine/core";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, Link, useNavigation } from "@remix-run/react";
import type { User } from "@supabase/supabase-js";
import { IconChevronLeft } from "@tabler/icons-react";
import { createUserSession, getUserToken } from "~/auth.server";
import supabase from "~/models/supabase";
import qs from "qs";

interface InputData {
  email: string;
  password: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  const { accessToken } = await getUserToken(request);

  if (accessToken) return redirect("/");

  return {};
};

export const action: ActionFunction = async ({ request }) => {
  const inputData = qs.parse(await request.text()) as unknown as InputData;

  const { data, error } = await supabase.auth.signInWithPassword(inputData);
	// Supabase 를 통해 로그인 요청을 보냈지만 에러가 발생한 경우
  if (error) {
    return json({
      error: true,
      message: {
        title: "로그인 실패",
        message: error.message,
        color: "red",
      },
    });
  }

  return await createUserSession({ // 유저 세션 생성
    request,
    access_token: data.session?.access_token as string,
    refresh_token: data.session?.refresh_token as string,
    expires_at: data.session?.expires_at as number,
    user: data.user as User,
    redirectTo: "/",
  });
};

export default function SignIn() {
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
        <Group spacing="xs">
          <Link to="/">
            <ActionIcon>
              <IconChevronLeft size={24} />
            </ActionIcon>
          </Link>
          <Text weight={500}>로그인</Text>
        </Group>
        <Divider my="md" />
        <Form method="post">
          <Input
            name="email"
            type="email"
            variant="filled"
            placeholder="이메일"
            disabled={navigation.state === "submitting"} // UI 최적화
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
            로그인
          </Button>
          <Space h="sm" />
          <Link to="/auth/sign-up">
            <Button
              variant="light"
              fullWidth
              radius="md"
              disabled={navigation.state === "submitting"}
            >
              회원가입
            </Button>
          </Link>
        </Form>
      </Card>
    </Box>
  );
}