import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [inputs, setInputs] = useState({
    eName: "",
    eDescription: "",
    startDate: "",
    endDate: "",
    organizer: "",
  });
  const [ticket, setTicket] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  let ticketArr = [];

  useEffect(() => {
    function getEvent() {
      fetch(`http://localhost:5000/api/event`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("res=>>", res);
        })
        .catch((err) => {
          console.error("err=>", err);
        });
    }
    getEvent();
  }, []);

  useEffect(() => {
    handleValidate(inputs);
  }, [inputs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (handleValidate(inputs)) {
      if (ticket[ticket.length - 1]?.status === 0) {
        return;
      }
      fetch(`http://localhost:5000/api/event`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, ticket }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("res=>>", res);
          alert(res.message);
        })
        .catch((err) => {
          console.error("err=>", err);
        });
    }
  };

  const handleChangeTicket = (e, index) => {
    const { name, value } = e.target;
    let ticketArr = ticket.slice();
    ticketArr[index] = { ...ticketArr[index], [name]: value };
    setTicket(ticketArr);
  };

  const handleSaveTicket = (index) => {
    ticketArr = ticket.slice();
    ticketArr[index] = { ...ticketArr[index], ["status"]: 1 };
    setTicket(ticketArr);
  };

  const handleEditTicket = (index) => {
    ticketArr = ticket.slice();
    ticketArr[index] = { ...ticketArr[index], ["status"]: 0 };
    setTicket(ticketArr);
  };

  const addTicket = () => {
    const value = {
      id: "",
      number: "",
      price: "",
      status: 0,
    };
    setTicket((currentArray) => [...currentArray, value]);
  };

  const deleteTicket = (index) => {
    const newArray = [...ticket];
    newArray.splice(index, 1);
    setTicket(newArray);
  };

  const handleValidate = (values) => {
    let errors = {};
    let isValid = true;
    if (!values["eName"]) {
      isValid = false;
      errors["eName"] = "Please enter event name.";
    }
    if (!values["eDescription"]) {
      isValid = false;
      errors["eDescription"] = "Please enter event description.";
    }
    if (!values["startDate"]) {
      isValid = false;
      errors["startDate"] = "Please enter startDate.";
    }
    if (!values["endDate"]) {
      isValid = false;
      errors["endDate"] = "Please enter endDate.";
    }
    if (!values["organizer"]) {
      isValid = false;
      errors["organizer"] = "Please enter organizer.";
    }
    setErrors(errors);
    return isValid;
  };

  return (
    <div className="App">
      <h1>Test</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="eName">Event name:</label>
        <input
          type="text"
          name="eName"
          value={inputs.eName}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{submitted && errors.eName}</p>
        <br /> <br />
        <label htmlFor="eDescription">Event description:</label>
        <input
          type="text"
          name="eDescription"
          value={inputs.eDescription}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{submitted && errors.eDescription}</p>
        <br /> <br />
        <label htmlFor="startDate">start date:</label>
        <input
          type="date"
          name="startDate"
          value={inputs.startDate}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{submitted && errors.startDate}</p>
        <label htmlFor="endDate">end date:</label>
        <input
          type="date"
          name="endDate"
          value={inputs.endDate}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{submitted && errors.endDate}</p>
        <br /> <br />
        <label htmlFor="organizer">organizer:</label>
        <input
          type="text"
          name="organizer"
          value={inputs.organizer}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{submitted && errors.organizer}</p>
        <br /> <br />
        <button type="button" onClick={() => addTicket()}>
          Add New Ticket
        </button>
        {ticket.map((item, index) => {
          return (
            <div key={index}>
              <label htmlFor="id">id:</label>
              <input
                type="text"
                name="id"
                value={item.id}
                onChange={(value) => handleChangeTicket(value, index)}
                required
                disabled={item.status !== 0 ? true : false}
              />
              <label htmlFor="number">ticket number:</label>
              <input
                type="text"
                name="number"
                value={item.number}
                onChange={(value) => handleChangeTicket(value, index)}
                required
                disabled={item.status !== 0 ? true : false}
              />
              <label htmlFor="price">price:</label>
              <input
                type="text"
                name="price"
                value={item.price}
                onChange={(value) => handleChangeTicket(value, index)}
                required
                disabled={item.status !== 0 ? true : false}
              />

              {item.status === 0 ? (
                <span>
                  <button type="button" onClick={() => handleSaveTicket(index)}>
                    Save
                  </button>
                </span>
              ) : (
                <span>
                  <button type="button" onClick={() => handleEditTicket(index)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => deleteTicket(index)}>
                    Delete
                  </button>
                </span>
              )}
            </div>
          );
        })}
        <br /> <br /> <br />
        <button type="submit">Save Event</button>
      </form>
    </div>
  );
}

export default App;
