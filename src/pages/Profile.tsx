import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteUser, logout } from "../controllers/user.controller";
import { useAppSelector } from "../hooks"

const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    await deleteUser();
    return logout();
  };

  useEffect(() => {
    if (!user) return navigate('/');
  }, [user, navigate]);

  return (<Container>
    <h1>Your Profile</h1>
    <p><Button variant="danger" onClick={handleDeleteAccount}>Delete account</Button></p>
  </Container>);
}

export default Profile;