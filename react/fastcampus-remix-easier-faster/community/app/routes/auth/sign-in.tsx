import { ActionIcon, Box, Button, Card, Divider, Group, Input, Space, Text } from "@mantine/core";
import { Form, Link, useNavigation } from "@remix-run/react";
import { IconChevronLeft } from "@tabler/icons-react";

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