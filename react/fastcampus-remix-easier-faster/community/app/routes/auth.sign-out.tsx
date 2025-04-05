import type { LoaderFunction } from "@remix-run/node";
import { logout } from "~/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return await logout(request);
};

export default function SignOut() {
  return <></>;
}