import { useAppSelector } from "../hooks";

const Home: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);

  return (<>
    <h1>{user ? `Welcome, ${user.firstName}!` : 'Welcome!'}</h1>
  </>)
};

export default Home;