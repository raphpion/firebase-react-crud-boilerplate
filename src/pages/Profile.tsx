import { onAuthStateChanged } from "firebase/auth";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteUser, logout } from "../controllers/user.controller";
import { auth } from "../firebaseConfig";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const handleDeleteAccount = async () => {
    await deleteUser();
    return logout();
  };

  onAuthStateChanged(auth, (authUser) => {
    if (authUser === null) navigate('/');
  });

  return (<Container>
    <h1>Your Profile</h1>
    <p><Button variant="danger" onClick={handleDeleteAccount}>Delete account</Button></p>
  </Container>);
}

export default Profile;