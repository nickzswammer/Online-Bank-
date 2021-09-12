import Layout from "../components/Layout";
import firebase from "firebase";
import Button from "@material-ui/core/Button";
import React, { useState, useEffect } from "react";

import { Divider } from "@material-ui/core";
import { Select } from "@chakra-ui/react";
import { Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { IconButton } from "@material-ui/core";

import { DataGrid, selectedGridRowsSelector } from "@mui/x-data-grid";

import {
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const columns = [
  {
    field: "receiver",
    headerName: "Receiver",
    width: 260,
  },
  {
    field: "amount",
    headerName: "Amount Sent",
    width: 130,
  },
  { field: "type", headerName: "Type", width: 130 },
];

export default function bank_home() {
  const currentDate = Math.floor(Date.now() / 1000);

  const db = firebase.firestore();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");
  const [select, setSelect] = useState("");

  const [balance, setBalance] = useState([]);

  useEffect(() => {
    const balanceRef2 = db.collection("balance");

    function getBalance() {
      balanceRef2.onSnapshot((querySnapshot) => {
        const balances = [];
        querySnapshot.forEach((doc) => {
          balances.push(doc.data());
        });
        setBalance(balances);
      });
    }
    getBalance();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();

    var isNegative = false;
    if (select === "Transfer") {
      isNegative = true;
    }

    if (amount === "" || receiver === "") {
      toast({
        title: "Error: Blank Fields",
        description: "No fields can be left blank. Please fill out all fields.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      let new_amount = amount;
      if (isNegative) {
        new_amount = amount * -1;
      }

      const increment = firebase.firestore.FieldValue.increment(new_amount);
      const balanceRef = db.collection("balance").doc("current_balance");

      balanceRef.update({ balance: increment });

      db.collection("transfers")
        .add({
          id: Math.random() * (10000000000000000).toString(),
          amount: `$${new_amount}`,
          receiver: receiver,
          type: select,
          timestamp: currentDate,
        })
        .then(() => {
          onClose();
          toast({
            title: "Success",
            description: "The transfer request has been sent successfully.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((error) => {
          toast({
            title: "An Error Has Occurred",
            description: error.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    }
  };

  const [transfers, setTransfers] = useState([]);

  const rows = transfers;

  useEffect(() => {
    const ref = firebase
      .firestore()
      .collection("transfers")
      .orderBy("timestamp", "desc");

    function getTransfers() {
      ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setTransfers(items);
      });
    }
    getTransfers();
  }, []);

  return (
    <Layout title="Personal Bank Account">
      <div className="mx-96 mt-24">
        <div className="mb-12 flex flex-col align-middle justify-center mx-64">
          <h1 className="text-center mb-5 text-3xl font-semibold">
            Bank Account - Make Transfers or Requests
          </h1>
          <div className=" text-center">
            <Divider></Divider>
          </div>

          <div className="text-center mt-12 text-xl flex justify-center align-middle">
            <div className="mr-5">
              <AccountBalanceIcon />
            </div>
            <h1>Account Balance: $</h1>
            {balance.map((bal) => (
              <h1>{bal.balance}</h1>
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <div className="mx-2">
            <Button onClick={onOpen} variant="contained" color="primary">
              Transfer
            </Button>
          </div>

          <div className="mx-2">
            <Button onClick={onOpen} variant="contained" color="default">
              Request
            </Button>
          </div>
        </div>

        <div className="text-center mb-8 mt-12">
          <h1 className="font-semibold text-xl">Transaction History:</h1>{" "}
        </div>

        <div style={{ height: 400 }} className="mx-72">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Send a Request or Transfer</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="reciever" isRequired>
                <FormLabel>Account Name of Transfer or Request</FormLabel>
                <Input
                  onChange={(e) => setReceiver(e.target.value)}
                  value={receiver}
                  placeholder="Account Name"
                />
              </FormControl>

              <FormControl className="mt-5" id="amount" isRequired>
                <FormLabel>Amount </FormLabel>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="$"
                  />
                  <Input
                    placeholder="Enter amount"
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                  />
                </InputGroup>
              </FormControl>

              <FormControl className="mt-5" id="selector" isRequired>
                <FormLabel>Transfer or Request </FormLabel>
                <Select
                  placeholder="Select option"
                  onChange={(e) => setSelect(e.target.value)}
                  value={select}
                >
                  <option value="Transfer">Transfer Money</option>
                  <option value="Request">Request Money</option>
                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <div className="mr-5">
                <Button variant="contained" color="secondary" onClick={onClose}>
                  Close
                </Button>
              </div>

              <Button variant="contained" color="primary" onClick={handleClick}>
                Send
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </Layout>
  );
}
