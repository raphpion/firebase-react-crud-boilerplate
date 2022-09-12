import { Container } from "react-bootstrap";
import { useAppSelector } from "../hooks";

const Home: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);

  return (<Container>
    <h1>{user ? `Welcome, ${user.displayName}!` : 'Welcome!'}</h1>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates porro harum aut ducimus eaque cum, doloribus
      fuga quas vitae minima maxime provident sequi consectetur pariatur totam aspernatur veniam similique in.</p>
  </Container>)
};

export default Home;
