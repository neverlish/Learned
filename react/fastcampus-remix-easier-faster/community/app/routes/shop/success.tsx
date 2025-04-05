import { Alert, Box, Space, Title } from "@mantine/core";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { IconCheck } from "@tabler/icons-react";
import { authenticate } from "~/auth.server";
import supabase from "~/models/supabase";
import { updatePointByUserId } from "~/models/user.service";

interface ILoaderData {
  result: any;
}


export const loader: LoaderFunction = async ({ request, params }) => {
  const { accessToken } = await authenticate(request);

  if (!accessToken) return redirect("/auth/login");

  const {
    data: { user },
  } = await supabase.auth.getUser(accessToken);

  if (!user) return redirect("/auth/login");

  const orderId = new URL(request.url).searchParams.get("orderId");
  const paymentKey = new URL(request.url).searchParams.get("paymentKey");
  const amount = new URL(request.url).searchParams.get("amount");
  

  const data = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.TOSS_SECRET_KEY}`,
    },
    body: JSON.stringify({
      orderId,
      paymentKey,
      amount,
    }),
  });

  const result = await data.json();

  if (result.status === "DONE") {
    await updatePointByUserId(user.id, result.totalAmount);
  }

  return json<ILoaderData>({ result: result });
}

export default function Shop() {
  const { result } = useLoaderData<ILoaderData>();
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
        포인트 구매가 완료되었습니다. Message: {JSON.stringify(result)}
      </Alert>
    </Box>
  );
}