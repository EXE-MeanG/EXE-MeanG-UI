import { PlusOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
const addButtonRef = useRef<HTMLButtonElement>(null);
const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
function CalendarToolbars() {
  return (
    <div>
      <div className="calendar-toolbar">
        <button
          ref={addButtonRef}
          className="add-event-button"
          aria-label="Add event"
        >
          <PlusOutlined />
          <span>Add Event</span>
        </button>
      </div>
    </div>
  );
}
export default CalendarToolbars;
