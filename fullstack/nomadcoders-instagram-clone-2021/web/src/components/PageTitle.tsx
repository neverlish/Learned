import { Helmet } from "react-helmet-async";

function PageTitle({ title }: { title: string }) {
  return <Helmet>{title} | Instaclone</Helmet>;
}

export default PageTitle;