import { Link } from "react-router-dom";

const NotFound: React.FC = () => (<>
  <h1>404 - Not found</h1>
  <p>It seems like we couldn't find what you were looking for.</p>
  <Link to="/home">{"< "} Go Home</Link>
</>);

export default NotFound;