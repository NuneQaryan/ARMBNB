import React, { useState } from "react";
import { Sign, LogedInUser } from "../../context/UserStateContext";
import { HOME_PATH, OFFER_PATH, SIGNUP_PATH } from "../../constants/path";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/Logo.png";
import styles from "./Header.module.css";
import avatar from "../../icons/user.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { auth } from "../../configs/firebase";
import { signOut } from "firebase/auth";
import LogInDialog from "../Dialogs/LoginDialog/LogInDialog";
import SignUpDialog from "../Dialogs/SignUpDialog/SignUpDIalog";

function Header() {
  const sign = React.useContext(Sign);
  const logedInUser = React.useContext(LogedInUser);
  const navigation = useNavigate();
  const [loginDialog, setLoginDialog] = useState(false);
  const [signUpDialog, setSignUpDialog] = useState(false);

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const renderSign = () => {
    console.log(sign);
    if (sign) {
      return null;
    }
    return !logedInUser ? (
      <div className={styles.sign}>
        <Button
          variant="text"
          onClick={() => {
            setLoginDialog(true);
          }}
          sx={{
            color: "#3f3b34",
            borderColor: "#3f3b34",
          }}
        >
          Sign In
        </Button>
        <Button
          sx={{
            color: "#3f3b34",
            borderColor: "#3f3b34",
          }}
          variant="outlined"
          // onClick={navigation(SIGNUP_PATH)}
        >
          Sign Up
        </Button>
        <LogInDialog
          open={loginDialog}
          handleClose={() => {
            setLoginDialog(false);
          }}
        />
        <SignUpDialog
          open={signUpDialog}
          handleClose={() => {
            setSignUpDialog(false);
          }}
        />
      </div>
    ) : (
      <div className={styles.logout}>
        <Button
          sx={{ color: "#3f3b34", borderColor: "#3f3b34" }}
          variant="outlined"
          onClick={logOut}
        >
          Log Out
        </Button>
        <span>
          <img src={avatar} alt="avatar" />
        </span>
      </div>
    );
  };

  return (
    <header className={styles.header}>
      <div onClick={() => navigation(HOME_PATH)}>
        <img className={styles.logo} src={Logo} alt="logo"></img>
      </div>

      <div className={styles.search}>
        <TextField id="outlined-basic" label="Search" variant="outlined" />
      </div>

      <span
        onClick={() => navigation(OFFER_PATH)}
        className={styles.addOfferSpan}
      >
        Add your host
      </span>
      {renderSign()}
    </header>
  );
}

export default Header;
