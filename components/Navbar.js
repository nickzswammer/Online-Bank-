import Link from "next/link";
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useAuth } from "../auth";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  var SignOut = async () => {
    await firebase.auth().signOut();
    window.location.href = "/";
  };

  const { user } = useAuth();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link href="/">Grand Central Bank of America</Link>
          </Typography>
          <div className="mr-8">
            <Button color="inherit" variant="outlined" disabled={!user}>
              <Link href="/">{`${user ? "Home" : ""} `}</Link>
            </Button>{" "}
          </div>

          <div className="mr-8">
            <Button color="inherit" variant="outlined" disabled={!user}>
              <Link href="/bank-home">{`${user ? "Bank Account" : ""} `}</Link>
            </Button>{" "}
          </div>

          <div>
            <Button color="secondary" variant="outlined" onClick={SignOut}>
              <Link href="/">{`${user ? "Sign Out" : ""} `}</Link>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
