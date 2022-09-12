import { useAppSelector } from "../hooks";

interface AvatarProps {
  size?: number;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const user = useAppSelector((state) => state.user.user);
  const setSize = props.size ? props.size : 128;
  const setURL = user?.photoURL ? user?.photoURL : './assets/avatar-blank.png';
  return <img style={{ width: setSize, height: setSize, borderRadius: '100%' }} src={setURL} alt="user avatar" />
}

export default Avatar;