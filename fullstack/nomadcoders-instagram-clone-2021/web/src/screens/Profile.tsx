import { useParams } from "react-router-dom";

function Profile() {
  const { username } = useParams<{ username: string }>();
  return "Profile";
}

export default Profile;