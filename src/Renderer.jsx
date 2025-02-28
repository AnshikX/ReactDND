import React from "react";
import DropZone from "./DropZone";
import { useDrag } from "react-dnd";
import { SIDEBAR_ITEMS } from "./constants";

const Renderer = ({ data, handleDrop, path }) => {
  return (
    <div className="renderer">
      {data.map((item, index) => {
        const currentPath = path ? `${path}-${index}` : `${index}`;
        const component = SIDEBAR_ITEMS.find(
          (sidebarItem) => sidebarItem.id === item.id
        );

        return (
          <div key={item.id} className="renderer-item">
            <DropZone
              data={{
                path: currentPath,
                childrenCount: data.length,
              }}
              onDrop={handleDrop}
              path={currentPath}
            />
            <div className="component">
              {component ? (
                <div className="component-content">
                  <strong>Type:</strong> {component.type}
                  {component.type === "TEXT" && (
                    <div>
                      <strong>Content:</strong> {component.value}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <strong>Element Type:</strong> {item.elementType}
                  {item.elementType === "TEXT" && (
                    <div>
                      <strong>Content:</strong> {item.value}
                    </div>
                  )}
                </div>
              )}
            </div>
            {item.children && (
              <Renderer
                data={item.children}
                handleDrop={handleDrop}
                path={currentPath}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Renderer;
