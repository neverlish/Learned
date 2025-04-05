import { Alert, Box, Space, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export default function Shop() {
  return (
    <Box
      sx={{
        padding: "0 50px",
        paddingTop: "50px",
        width: "calc(100% - 100px)",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <Title>포인트 구매완료</Title>
      <Space h="xl" />
      <Alert icon={<IconCheck size="1rem" />} title="결제 완료">
        포인트 구매가 완료되었습니다.
      </Alert>
    </Box>
  );
}