import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { onAuthStateChanged } from "firebase/auth";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { deleteUser, logout, updateUser } from "../controllers/user.controller";
import { auth } from "../firebaseConfig";
import { useAppSelector } from "../hooks";
import * as yup from 'yup';
import { UpdateUserPayload } from "../models/user.model";
import { TextField } from "formik-mui";

const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  onAuthStateChanged(auth, (authUser) => {
    if (authUser === null) navigate('/');
  });

  const handleDeleteUser = async () => {
    try {
      // setLoading?
      await deleteUser();
      return logout();
      // setLoading?
    } catch (error) {
      // setLoading?
    }
  };

  const handleUpdateUser = async (values: UpdateUserPayload) => {
    try {
      if (!user) throw new Error('There is no user to update!');
      // setLoading?
      const payload: UpdateUserPayload = {
        ...((values.displayName !== null && values.displayName !== user.displayName) && { displayName: values.displayName }),
        ...((values.photoURL !== null && values.photoURL !== user.photoURL) && { photoURL: values.photoURL }),
      };
      await updateUser(user.id, payload);
      // setLoading?
    } catch (error) {
      // setLoading?
    }
  };

  const initialValues: UpdateUserPayload = {
    displayName: user?.displayName,
    photoURL: user?.photoURL,
  };

  return (<Container>
    <h1>Your Profile</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={yup.object({
        displayName: yup.string(),
        photoURL: yup.string().url("Please enter a valid URL.").nullable(true),
      })}
      onSubmit={(values) => {
        handleUpdateUser(values);
      }}>{() => (<Form>
        <div><Field
          component={TextField}
          name="displayName"
          type="text"
          label="Display Name" /></div>
        <div><Field
          component={TextField}
          name="photoURL"
          type="text"
          label="Photo URL" /></div>
        <div><Button variant="contained" type="submit">Update profile</Button></div>
      </Form>)}
    </Formik>
    <p><Button variant="contained" color="error" onClick={handleDeleteUser}>Delete account</Button></p>
  </Container>);
}

export default Profile;