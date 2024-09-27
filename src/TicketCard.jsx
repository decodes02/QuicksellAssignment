import React from "react";
import Pictures from "./Pictures"; // Import the priority images and action icons

// Map the priority levels to their corresponding images
const priorityImageMapping = {
  0: Pictures.Nopriority, // No priority image
  1: Pictures.LowPriority, // Low priority image
  2: Pictures.MediumPriority, // Medium priority image
  3: Pictures.HighPriority, // High priority image
  4: Pictures.UrgentPriClr, // Urgent priority image
};

function TicketCard({ ticket }) {
  const priorityImage = priorityImageMapping[ticket.priority]; // Get the image for the priority

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        {/* You can add more details like user avatar here if available */}
      </div>
      <h3>{ticket.title}</h3>
      <div className="ticket-footer">
        <img
          src={priorityImage}
          alt={`Priority ${ticket.priority}`}
          className="priority-image"
        />
        <span className="feature-label">{ticket.tag[0]}</span>

      </div>
    </div>
  );
}

export default TicketCard;
