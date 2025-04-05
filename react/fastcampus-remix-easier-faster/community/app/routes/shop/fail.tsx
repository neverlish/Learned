import { Alert, Box, Space, Title } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

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
      <Alert
        icon={<IconAlertCircle size="1rem" />}
        title="결제 실패"
        color="red"
      >
        포인트 구매를 실패하였습니다.
      </Alert>
    </Box>
  );
}