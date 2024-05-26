"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableColumn,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import NavAdmin from "../NavBar";
import adminAuth from "@/utils/adminAuth";
import axios from "axios";

const Agent = () => {
  const [agents, setAgents] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

   useEffect(() => {
     const fetchAgents = async () => {
       try {
         const response = await axios.get(
           "http://localhost:8000/api/user/users"
         );
         const agentsData = response.data.filter(
           (user: any) => user.role === "AGENT"
         );
         setAgents(agentsData);
       } catch (error) {
         console.error("Error fetching agents:", error);
       }
     };

     fetchAgents();
   }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/user/", {
        email,
        fname,
        lname,
        password,
        confirmPassword,
        role: "AGENT",
      });
      setMessage("Agent registered successfully!");
      // setAgents([...agents, response.data]); // Update the agent list
      onOpenChange(); // Close the modal
    } catch (error: any) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        setMessage("Error: No response from the server.");
      } else {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex h-screen gap-5">
      <NavAdmin />
      <div className="w-[75%] h-screen py-3">
        <div className="flex gap-x-4 justify-between items-center">
          <h2 className="text-center cursor-point">Travel Agents</h2>
          <Button color="primary" onPress={onOpen}>
            Add Agent
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>
                    <h2 id="modal-title">New Agent</h2>
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex gap-x-2">
                      <Input
                        placeholder="First Name"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                      />
                      <Input
                        placeholder="Last Name"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                      />
                    </div>
                    <Input
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {message && <p className="text-red-500">{message}</p>}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onPress={onClose}>
                      Close
                    </Button>
                    <Button onClick={handleSubmit}>Create</Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <Divider />
        <Card className="mt-2">
          <CardBody>
            <Table aria-label="Example table with custom cells">
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Role</TableColumn>
                <TableColumn>Joined Date</TableColumn>
              </TableHeader>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>{agent.fname} {agent.lname}</TableCell>
                    <TableCell>{agent.role}</TableCell>

                    <TableCell>
                      {new Date(agent.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default adminAuth(Agent);
