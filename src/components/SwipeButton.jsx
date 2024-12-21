import React, { useState, useRef, useEffect } from "react";

export function SwipeButton({ onConfirm, text }) {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);

  const CONFIRM_THRESHOLD = 0.9;
  const thresholdPos = trackWidth * CONFIRM_THRESHOLD;

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.clientWidth);
    }
  }, []);

  const updateOffset = (clientX) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    let newX = clientX - rect.left;
    if (newX < 0) newX = 0;
    if (thresholdPos > 0 && newX > thresholdPos) newX = thresholdPos;
    setOffsetX(newX);
  };

  const startDrag = (clientX) => {
    setIsDragging(true);
    updateOffset(clientX);
  };

  const moveDrag = (clientX) => {
    if (!isDragging) return;
    updateOffset(clientX);
  };

  const endDrag = () => {
    if (!trackRef.current) return;

    const isConfirmed = thresholdPos > 0 && offsetX >= thresholdPos;
    setIsDragging(false);
    setOffsetX(0);

    if (isConfirmed) {
      onConfirm();
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    startDrag(e.clientX);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      startDrag(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => moveDrag(e.clientX);
    const handleMouseUp = endDrag;
    const handleTouchMove = (e) => {
      if (e.touches.length === 1) {
        moveDrag(e.touches[0].clientX);
      }
    };
    const handleTouchEnd = endDrag;

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, offsetX, thresholdPos]);

  const visibilityRatio =
    thresholdPos > 0 ? Math.min(offsetX / thresholdPos, 1) : 0;

  const checkOpacity = visibilityRatio;

  const textOpacity = 1 - visibilityRatio;

  return (
    <div
      ref={trackRef}
      className="relative w-full bg-gray-300 rounded-full h-16 flex items-center overflow-hidden select-none px-2 py-6 backdrop-blur-2xl z-0"
      style={{ userSelect: "none" }}
      onMouseDown={(e) => e.preventDefault()}
      onTouchStart={(e) => e.preventDefault()}
    >
      <div
        className="absolute left-0 w-full text-center text-gray-700 font-medium pointer-events-none transition-opacity duration-200 z-10"
        style={{ opacity: textOpacity }}
      >
        {text}
      </div>
      {/* coucou */}
      {trackWidth > 0 && (
        <div
          className="absolute flex items-center justify-center bg-gray-500 rounded-full h-10 w-10 text-white transition-opacity duration-200 right-0"
          style={{
            left: `${CONFIRM_THRESHOLD * 100}%`,
            transform: "translateX(-50%)",
            opacity: checkOpacity,
          }}
        >
          ✓
        </div>
      )}

      <div
        className="absolute bg-primary rounded-full h-12 w-12 flex items-center justify-center text-white font-bold cursor-grab active:cursor-grabbing transition-transform duration-200 left-[20px]"
        style={{ transform: `translateX(${offsetX}px)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <img src="arrow.svg" alt="" />
      </div>
    </div>
  );
}
