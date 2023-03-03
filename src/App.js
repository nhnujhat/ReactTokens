import React, { useState } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { tokens } from "./tokens";

function App() {
  const [tokenSelected, setTokenSelected] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const notify = () => toast("Token Selected!");
  const showError = () => toast("Invalid Token!");

  const updateToken = (address) => {
    setTokenSelected(address);
  };

  return (
    <div className="App">
      <h1 className="title">Select Token</h1>
      <div className="address">
        <input
          type="text"
          placeholder="Token address"
          className="textbox"
          value={tokenSelected}
          onChange={(e) => setTokenSelected(e.target.value)}
        />
        <button
          className="button"
          onClick={() => {
            for (var i = 0; i < tokens.length; i++) {
              if (tokens[i].address == tokenSelected) {
                notify();
                return;
              }
            }
            showError();
          }}
        >
          Select
        </button>
        <ToastContainer />
      </div>
      <button
        className="button"
        onClick={() => {
          setModalIsOpen(true);
          setQuery("");
        }}
      >
        Search
      </button>
      <Modal className="modalBackground" isOpen={modalIsOpen}>
        <div className="modalContainer">
          <button
            className="button"
            onClick={() => {
              setModalIsOpen(false);
            }}
          >
            X
          </button>
          <h1 className="title">Search for Token Address or Symbol</h1>
          <div className="search">
            <input
              type="text"
              placeholder="Search"
              className="textbox"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="body">
            <div>
              <table>
                <tbody>
                  {tokens
                    .filter(
                      (token) =>
                        token.symbol
                          .toLowerCase()
                          .includes(query.toLowerCase()) ||
                        token.address
                          .toLowerCase()
                          .includes(query.toLowerCase())
                    )
                    .map((token) => (
                      <tr
                        onClick={() => {
                          setModalIsOpen(false);
                          updateToken(token.address);
                        }}
                        key={token.symbol}
                      >
                        <td>{token.symbol}</td>
                        <td>{token.address}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
