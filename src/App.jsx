import React, { useState, useEffect } from "react";
import KanbanBoard from "./KanbanBoard";
import "./App.css";
import DisplayIcon from "../images/Display.svg"; // Adjust path to Display.svg
import DownArrowIcon from "../images/down.svg"; // Adjust path to down.svg

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]); // Add users state
  const [grouping, setGrouping] = useState("user"); // Default grouping set to 'user'
  const [ordering, setOrdering] = useState("priority"); // Default ordering
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Toggle dropdown

  // Fetch tickets and users from the API when the component mounts
  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users); // Set users from the API response
      });

    // Retrieve the saved grouping and ordering from localStorage
    const savedGrouping = localStorage.getItem("grouping");
    const savedOrdering = localStorage.getItem("ordering");

    if (savedGrouping) {
      setGrouping(savedGrouping); // Set grouping from localStorage
    }
    if (savedOrdering) {
      setOrdering(savedOrdering); // Set ordering from localStorage
    }
  }, []);

  // Save the selected grouping and ordering to localStorage
  const handleGroupingChange = (e) => {
    const newGrouping = e.target.value;
    setGrouping(newGrouping);
    localStorage.setItem("grouping", newGrouping); // Save grouping to localStorage
  };

  const handleOrderingChange = (e) => {
    const newOrdering = e.target.value;
    setOrdering(newOrdering);
    localStorage.setItem("ordering", newOrdering); // Save ordering to localStorage
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="App">
      <div className="dropdown-container">
        {/* Display button with SVG icons */}
        <button className="dropdown-button" onClick={toggleDropdown}>
          <img src={DisplayIcon} alt="Display Icon" className="icon" />
          Display
          <img
            src={DownArrowIcon}
            alt="Down Arrow Icon"
            className="down-icon"
          />
        </button>

        {/* Dropdown content with Grouping and Ordering */}
        {isDropdownOpen && (
          <div className="dropdown-content">
            {/* dropdown */}
            <div className="dropdown-section">
              {/* dropdown- */}
              <label>Grouping</label>
              <select value={grouping} onChange={handleGroupingChange}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-section">
              <label>Ordering</label>
              <select value={ordering} onChange={handleOrderingChange}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Kanban Board Component */}
      <KanbanBoard
        tickets={tickets}
        users={users}
        grouping={grouping} // Pass grouping to KanbanBoard
        ordering={ordering} // Pass ordering to KanbanBoard
      />
    </div>
  );
}

export default App;
