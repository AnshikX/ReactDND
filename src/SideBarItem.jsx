import React from "react";
import { useDrag } from "react-dnd";

const SideBarItem = ({ data }) => {
  const [{ opacity }, drag] = useDrag({
    type: "HTML",
    item: {...data, type: "HTML"},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  });
  
  return (
    <div className="sideBarItem" ref={drag} style={{ opacity }}>
      {data.label}
    </div>
  );
};
export default SideBarItem;
