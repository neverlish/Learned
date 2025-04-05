import { Box, Card } from "@mantine/core";

export default function SignIn() {
  return (
    <Box sx={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Card shadow="sm" p='lg' radius='md' withBorder>
        로그인 폼
      </Card>
    </Box>
  )
}