import React, { useState, useCallback } from "react";
import DropZone from "./DropZone";
import TrashDropZone from "./TrashDropZone";
import SideBarItem from "./SideBarItem";
import Row from "./Row";
import initialData from "./initial-data";
import { handleMoveWithinParent, handleMoveToDifferentParent, handleMoveSidebarComponentIntoParent, handleRemoveItemFromLayout } from "./helpers";
import { SIDEBAR_ITEMS, SIDEBAR_ITEM, COMPONENT, COLUMN } from "./constants";
import shortid from "shortid";
import Renderer from "./Renderer";

const Container = () => {
  const initialLayout = initialData.layout;
  const [layout, setLayout] = useState(initialLayout);

  const handleDropToTrashBin = useCallback(
    (dropZone, item) => {
      const splitItemPath = item.path.split("-");
      setLayout(handleRemoveItemFromLayout(layout, splitItemPath));
    },
    [layout]
  );

  const handleDrop = useCallback(
    (dropZone, item) => {
      console.log("dropZone", dropZone);
      console.log("item", item);

      const splitDropZonePath = dropZone.path.split("-");
      const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");

      const newItem = { id: item.id, type: item.elementType };
      if (item.elementType === "TEXT") {
        newItem.children = item.children;
      }

      // Prevent dropping into a `TEXT` element
      const targetItem = splitDropZonePath.reduce((acc, index) => {
        return acc && acc.children ? acc.children[index] : acc ? acc[index] : undefined;
      }, layout);
      if (targetItem && targetItem.type === "TEXT") {
        console.warn("Cannot drop into a TEXT element");
        return;
      }

      // Handle sidebar item drop
      if (item.type === "HTML") {
        const newComponent = {
          id: shortid.generate(),
          ...item,
        };

        setLayout(
          handleMoveSidebarComponentIntoParent(
            layout,
            splitDropZonePath,
            newItem
          )
        );
        return;
      }

      // Handle items with a path (non-sidebar items)
      if (!item.path) {
        console.error("Unexpected item without a path:", item);
        return;
      }

      const splitItemPath = item.path.split("-");
      const pathToItem = splitItemPath.slice(0, -1).join("-");

      // 2. Pure move (no create)
      if (splitItemPath.length === splitDropZonePath.length) {
        if (pathToItem === pathToDropZone) {
          setLayout(
            handleMoveWithinParent(layout, splitDropZonePath, splitItemPath)
          );
          return;
        }

        setLayout(
          handleMoveToDifferentParent(
            layout,
            splitDropZonePath,
            splitItemPath,
            newItem
          )
        );
        return;
      }

      // 3. Move + Create
      setLayout(
        handleMoveToDifferentParent(
          layout,
          splitDropZonePath,
          splitItemPath,
          newItem
        )
      );
    },
    [layout]
  );

  const renderRow = (row, currentPath) => {
    return (
      <Row
        key={row.id}
        data={row}
        handleDrop={handleDrop}
        path={currentPath}
      />
    );
  };

  const handleSave = () => {
    const savedConfig = { layout };
    console.log("Saved Configuration:", JSON.stringify(savedConfig, null, 2));
  };

  return (
    <div className="body">
      <div className="sideBar">
        {SIDEBAR_ITEMS.map((sideBarItem) => (
          <SideBarItem key={sideBarItem.id} data={sideBarItem} />
        ))}
      </div>
      <div className="pageContainer">
        <div className="page">
          <Renderer
            data={layout}
            handleDrop={handleDrop}
          />
          <DropZone
            data={{
              path: `${layout.length}`,
              childrenCount: layout.length,
            }}
            onDrop={handleDrop}
            isLast
          />
        </div>

        <TrashDropZone
          data={{
            layout,
          }}
          onDrop={handleDropToTrashBin}
        />
      </div>
      <div className="saveButtonContainer">
        <button onClick={handleSave} className="saveButton">
          Save Configuration
        </button>
      </div>
    </div>
  );
};
export default Container;
