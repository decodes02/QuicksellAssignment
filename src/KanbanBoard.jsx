import React from "react";
import TicketCard from "./TicketCard";
import Pictures from "./Pictures";

// Function to group tickets dynamically based on the grouping criteria
const groupTickets = (tickets, users, grouping) => {
  const groups = {};

  tickets.forEach((ticket) => {
    let groupKey;

    // Grouping logic based on the selected criteria
    if (grouping === "user") {
      const user = users.find((u) => u.id === ticket.userId); // Find the user associated with this ticket
      groupKey = user ? user.name : "Unknown"; // If user exists, use their name, otherwise "Unknown"
    } else if (grouping === "status") {
      groupKey = ticket.status; // Group by status
    } else if (grouping === "priority") {
      groupKey = ticket.priority; // Group by numeric priority
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(ticket);
  });

  return groups;
};

function KanbanBoard({ tickets, users, grouping, ordering }) {
  const groupedTickets = groupTickets(tickets, users, grouping);

  // Sorting logic based on ordering criteria
  Object.keys(groupedTickets).forEach((key) => {
    groupedTickets[key].sort((a, b) => {
      if (ordering === "priority") {
        return b.priority - a.priority; // Sort by priority descending
      }
      if (ordering === "title") {
        return a.title.localeCompare(b.title); // Sort by title alphabetically
      }
      return 0;
    });
  });

  return (
    <div className="kanban-board">
      {/* Iterate over the grouped tickets and display them in columns */}
      {Object.keys(groupedTickets).map((groupKey) => {
        const user = users.find((u) => u.name === groupKey); // Find the user object
        const initial = user ? user.name.charAt(0) : "U"; // Get the first letter of the user's name or 'U' for unknown

        return (
          <div key={groupKey} className="kanban-column">
            <div className="kanban-column-header">
              <div
                style={{
                  display: "flex",
                            alignItems: "center",
                            gap: "10px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* Display the first letter of the user's name */}
                  <span className="user-avatar">{initial}</span>
                  <div>{groupKey}</div>
                </div>

                {/* Display the number of tasks/cards */}
                <span className="task-count">
                  {groupedTickets[groupKey].length}
                </span>
              </div>
              {/* Add the actions section (plus and ellipsis) */}
              <div className="card-actions">
                <img
                  src={Pictures.Add}
                  alt="Add"
                  className="card-action-icon"
                />
                <img
                  src={Pictures.DotMenu}
                  alt="Options"
                  className="card-action-icon"
                />
              </div>
            </div>
            {groupedTickets[groupKey].map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default KanbanBoard;
