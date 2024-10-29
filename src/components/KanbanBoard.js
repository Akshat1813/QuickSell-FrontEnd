import React from "react";
import TicketCard from "./TicketCard";
import { getRandomColor, getInitials, priorityNames } from '../utils';

const KanbanBoard = ({ groupedTickets, grouping, statusIcons, priorityIcons, userMap }) => {
  return (
    <div className="kanban-board">
      {groupedTickets.map((group, index) => (
        <div key={index} className="kanban-group">
          <h2 className="card-title">
            <div className="title-left">
              {grouping === "status" && statusIcons[group.group]}
              {grouping === "priority" && priorityIcons[group.group]}
              {grouping === "user" && (
                <span className="profile-icon" style={{ backgroundColor: getRandomColor() }}>
                  {getInitials(group.group)}
                </span>
              )}
              {grouping !== "priority" ? group.group : priorityNames[group.group]}
              <span className="ticket-length">{group.tickets.length}</span>
            </div>
            <div className="title-right">
              <img src="./icons_FEtask/add.svg" alt="Add" height="20px" />
              <img src="./icons_FEtask/3 dot menu.svg" alt="3 dots" height="20px" />
            </div>
          </h2>
          {group.tickets.map((ticket) => (
            <TicketCard 
              key={ticket.id} 
              ticket={ticket} 
              grouping={grouping} 
              userMap={userMap} 
              statusIcons={statusIcons} 
              priorityIcons={priorityIcons} 
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
