import Layout from "../components/Layout";
import Image from "next/image";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Link from "next/link";
import React from "react";
import firebaseClient from "../firebaseClient";
import firebase from "firebase";
import "firebase/auth";
import { useState } from "react";
import { useToast } from "@chakra-ui/toast";
import { useAuth } from "../auth";

export default function sign_up() {
  firebaseClient();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const toast = useToast();
  const { user } = useAuth();
  return (
    <>
      <Layout title="Sign Up">
        <div className="mt-48 mb-24">
          <div className="text-center">
            <Image src="/lock-icon.png" width="50" height="50"></Image>
            <h1 className="text-2xl">Sign Up</h1>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col justify-center">
              <div className="mt-5 w-96">
                <TextField
                  disabled={user}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  fullWidth
                  autoComplete="email"
                  autoFocus
                  id="outlined-basic"
                  label="Email Address"
                  variant="outlined"
                  type="email"
                />
              </div>

              <div className="mt-4 w-96">
                <TextField
                  disabled={user}
                  onChange={(e) => setPass(e.target.value)}
                  value={pass}
                  required
                  fullWidth
                  autoComplete="password"
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type="password"
                />
              </div>

              <div className="mt-10">
                <Button
                  disabled={email === "" || pass === ""}
                  onClick={async () => {
                    await firebase
                      .auth()
                      .createUserWithEmailAndPassword(email, pass)
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
                  fullWidth
                >
                  Sign Up
                </Button>
              </div>

              <div className="mt-5">
                <p className="text-blue-700 hover:underline">
                  <Link href="/">Already have an account? Sign In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
