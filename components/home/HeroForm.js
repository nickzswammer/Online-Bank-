import FormControl from "@material-ui/core/FormControl";
import { InputLabel } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Button } from "@material-ui/core";
import Link from "next/link";
import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseClient from "../../firebaseClient";
import { useAuth } from "../../auth";
import { useToast } from "@chakra-ui/toast";

export default function HeroForm() {
  firebaseClient();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const toast = useToast();

  const { user } = useAuth();

  return (
    <div className="form-container bg-white py-8 shadow-lg">
      <form className="">
        <div className="">
          <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input
              disabled={user}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              type="email"
              startAdornment={
                <InputAdornment>
                  <MailOutlineIcon></MailOutlineIcon>
                </InputAdornment>
              }
              id="my-input"
              aria-describedby="my-helper-text"
            />
          </FormControl>
        </div>

        <br />
        <div>
          <FormControl>
            <InputLabel htmlFor="my-input2">Password</InputLabel>
            <Input
              disabled={user}
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              required
              type="password"
              startAdornment={
                <InputAdornment>
                  <LockOpenIcon></LockOpenIcon>
                </InputAdornment>
              }
              id="my-input2"
              aria-describedby="my-helper-text"
            />
          </FormControl>
        </div>

        <div className="mt-6">
          <Button
            disabled={email === "" || pass === ""}
            onClick={async () => {
              await firebase
                .auth()
                .signInWithEmailAndPassword(email, pass)
                .then(function () {
                  window.location.href = "/bank-home";
                  console.log("Success");
                })
                .catch(function (error) {
                  const message = error.message;
                  toast({
                    title: "An error occurred.",
                    description: message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                });
            }}
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        </div>
      </form>
      <br />
      <p>
        Don't have an account?{" "}
        <span className="text-blue-600 underline">
          <Link href="/sign-up">Register</Link>
        </span>
      </p>
    </div>
  );
}
