import React, { useState, useEffect } from "react";
import "./App.css"; 
import TicketCard from "./components/TicketCard";
import Dropdown from "./components/Dropdown";
import { statusIcons, priorityIcons, allStatuses } from "./constants/icons";
import { getInitials, getRandomColor } from "./utils/helpers";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem("grouping") === null ? "status" : localStorage.getItem("grouping") );
  const [sortOption, setSortOption] = useState(localStorage.getItem("sortOption") === null ? "priority" : localStorage.getItem("sortOption"));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const priorityNames = {
        0: "No Priority",
        1: "Low Priority",
        2: "Medium Priority",
        3: "High Priority",
        4: "Urgent Priority"
      };
    

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("sortOption", sortOption);
  }, [grouping, sortOption]);

  const fetchTickets = async () => {
    try {
      const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
      const data = await response.json();
      setTickets(data.tickets || []);
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const userMap = users.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {});

  const handleGroupingChange = (newGrouping) => setGrouping(newGrouping);
  const handleSortChange = (newSortOption) => setSortOption(newSortOption);

  const groupTickets = (tickets, grouping) => {
    const grouped = tickets.reduce((acc, ticket) => {
      const key = grouping === "user" ? ticket.userId : ticket[grouping];
      if (!acc[key]) acc[key] = [];
      acc[key].push(ticket);
      return acc;
    }, {});

    if (grouping === "status") {
      allStatuses.forEach((status) => {
        if (!grouped[status]) grouped[status] = [];
      });
    }

    return grouped;
  };

  const sortTickets = (tickets, sortOption) => {
    return [...tickets].sort((a, b) => {
      if (sortOption === "priority") return b.priority - a.priority;
      if (sortOption === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  };

  const groupedTickets = groupTickets(tickets, grouping);
  const sortedGroupedTickets = Object.keys(groupedTickets).map((key) => ({
    group: grouping === "user" ? userMap[key] || "Unknown User" : key,
    tickets: sortTickets(groupedTickets[key], sortOption),
  }));

  return (
    <div className="App">
      <Dropdown
        grouping={grouping}
        sortOption={sortOption}
        handleGroupingChange={handleGroupingChange}
        handleSortChange={handleSortChange}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />

      <div className="kanban-board">
        {sortedGroupedTickets.map((group, index) => (
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
              <TicketCard key={ticket.id} ticket={ticket} userMap={userMap} grouping={grouping} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
