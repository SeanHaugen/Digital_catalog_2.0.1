// ZoomableComponent.jsx
import React, { useRef, useEffect } from "react";

const ZoomableComponent = () => {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;

    const handleWheel = (event) => {
      if (event.ctrlKey) {
        event.preventDefault();

        const delta = event.deltaY || event.detail || event.wheelDelta;

        if (delta > 0) {
          // Zoom out
          container.style.transform = `scale(${
            container.style.transform
              ? parseFloat(container.style.transform.split(" ")[1]) - 0.1
              : 0.9
          })`;
        } else {
          // Zoom in
          container.style.transform = `scale(${
            container.style.transform
              ? parseFloat(container.style.transform.split(" ")[1]) + 0.1
              : 1.1
          })`;
        }
      }
    };

    container.addEventListener("wheel", handleWheel);

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
    >
      {/* Your content goes here */}
      <div style={{ padding: "20px" }}>
        <p>This is a zoomable component!</p>
      </div>
    </div>
  );
};

export default ZoomableComponent;
