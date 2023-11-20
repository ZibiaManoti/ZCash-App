import Form from "./Form";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/UserSlice";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { googleProvider, facebookProvider, twitterProvider } from "../firebase";
import { Button, Typography, Box } from "@mui/material";
import { Google, Facebook, Twitter } from "@mui/icons-material";
import { Colors } from "../styles/theme/theme";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.id,
            token: user.accessToken,
          })
        );
        navigate("/");
      })
      .catch((error) => {
        alert("User Does not Exist!");
        console.log(error);
      });
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const res = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(res);
    const token = credential.accessToken;
    const user = res.user;

    dispatch(
      setUser({
        email: user.email,
        id: user.id,
        token: user.accessToken,
      })
    );
    navigate("/");
    res.catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  };

  const handleFacebookSignIn = async () => {
    const auth = getAuth();
    try {
      const res = await signInWithPopup(auth, facebookProvider);

      // The signed-in user info.
      const user = res.user;

      dispatch(
        setUser({
          id: user.uid, // Use user.uid instead of user.id
          token: user.accessToken,
        })
      );
      navigate("/");
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  const handleTwitterSignIn = async () => {
    const auth = getAuth();
    try {
      const res = await signInWithPopup(auth, twitterProvider);

      // The signed-in user info.
      const user = res.user;

      dispatch(
        setUser({
          id: user.uid, // Use user.uid instead of user.id
          token: user.accessToken,
        })
      );
      navigate("/");
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in. You can redirect to the home page or perform other actions.
      // You can also store the user's data in your app's state or context for easy access.
      console.log("User is signed in:", user);
    } else {
      // User is signed out.
      console.log("User is signed out");
    }
  });

  return (
    <Box>
      <Form title="LOGIN" handleClick={handleLogin} />
      <Typography variant="subtitle2">OR</Typography>
      <Button
        variant="outlined"
        color="success"
        onClick={handleGoogleSignIn}
        endIcon={<Google />}
        sx={{ margin: "1rem" }}
        aria-label="Sign in with"
      >
        Sign in with
      </Button>

      <Button
        variant="outlined"
        color="success"
        onClick={handleFacebookSignIn}
        endIcon={<Facebook />}
        sx={{ margin: "1rem" }}
        aria-label="Sign in with"
      >
        Sign in with
      </Button>

      <Button
        variant="outlined"
        color="success"
        onClick={handleTwitterSignIn}
        endIcon={<Twitter />}
        sx={{ margin: "1rem" }}
        aria-label="Sign in with"
      >
        Sign in with
      </Button>
    </Box>
  );
};

export default Login;
