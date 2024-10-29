import React from "react";
import { statusIcons, priorityIcons } from "../constants/icons";
import { getInitials, getRandomColor } from "../utils/helpers";

const TicketCard = ({ ticket, userMap, grouping }) => {
  return (
    <div className="ticket-card">
      <div className="card-top">
        <h3>{ticket.id}</h3>
        {grouping !== "user" && (
          <span className="profile-icon" style={{ backgroundColor: getRandomColor() }}>
            {getInitials(userMap[ticket.userId] || "")}
          </span>
        )}
      </div>
      <div className="status-title">
        {grouping !== "status" && <div className="ticket-icon">{statusIcons[ticket.status] || null}</div>}
        <h3>{ticket.title}</h3>
      </div>
      {ticket.tag && (
        <div className="tag-icon">
          {grouping !== "priority" && priorityIcons[ticket.priority]}
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
            <circle cx="5" cy="5" r="5" fill="#d3d3d3" />
          </svg>
          <p className="tag">{ticket.tag}</p>
        </div>
      )}
    </div>
  );
};

export default TicketCard;
