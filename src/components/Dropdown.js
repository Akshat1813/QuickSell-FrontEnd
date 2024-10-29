import React from "react";

const Dropdown = ({ grouping, sortOption, handleGroupingChange, handleSortChange, isDropdownOpen, setIsDropdownOpen }) => {
  return (
    <div className="controls">
      <div className="display-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <img src="./icons_FEtask/Display.svg" alt="Display" />
        Display
        <img src="./icons_FEtask/down.svg" alt="Down" />
      </div>
      {isDropdownOpen && (
        <div className="dropdown">
          <div className="dropdown-item">
            <label className="label">
              Grouping
              <select className="grouping-select" value={grouping} onChange={(e) => handleGroupingChange(e.target.value)}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </label>
            <label className="label">
              Ordering
              <select className="grouping-select" value={sortOption} onChange={(e) => handleSortChange(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
