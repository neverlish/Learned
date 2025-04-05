import { showNotification } from "@mantine/notifications";
import { Outlet, useActionData } from "@remix-run/react";
import { useEffect, useState } from "react";

export interface IActionData {
  error: boolean;
  message: TMessage;
}

export default function Auth() {
  const actionData = useActionData<IActionData>();
  const [message, setMessage] = useState<TMessage>();

    useEffect(() => {
    console.log(actionData);
    if (actionData) {
      setMessage(actionData.message);
    }
  }, [actionData]);

  useEffect(() => {
    if (message) {
      showNotification({
        title: message.title,
        message: message.message,
        color: message.color,
      });
    }
  }, [message]);

  return <Outlet />;
}