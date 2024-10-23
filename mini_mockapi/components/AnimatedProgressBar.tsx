"use client";

import generateMockData from "@/lib/actions";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AnimatedProgressBarProps {
  EndpointId: number;
}

const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  EndpointId,
}) => {
  const [fillPercentage, setFillPercentage] = useState(0);
  const [hoverPercentage, setHoverPercentage] = useState<number | null>(null);

  useEffect(() => {
    const getCountFromDb = async () => {
      const response = await axios.get("/api/resource/" + EndpointId);
      if (response.data) {
        if (response.data.count) {
          setFillPercentage(response.data.count);
        } else {
          setFillPercentage(0);
        }
      }
    };

    getCountFromDb();
  }, [EndpointId]);

  const handleProgress = async (event: React.MouseEvent<HTMLDivElement>) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const position = Math.round(((event.clientX - left) / width) * 100);
    if (event.type === "click") {
      setFillPercentage(position);
      await generateMockData(EndpointId, position);
      toast.success(`generated ${position} mock data`);
    }
    setHoverPercentage(event.type === "mousemove" ? position : null);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className="relative w-full h-10 bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
        onClick={handleProgress}
        onMouseMove={handleProgress}
        onMouseLeave={() => setHoverPercentage(null)}
      >
        <div
          className="absolute top-0 left-0 h-full bg-purple-600 transition-all duration-500 ease-in-out"
          style={{ width: `${fillPercentage}%` }}
        />
        {hoverPercentage !== null && (
          <div
            className="absolute top-0 left-0 h-full bg-purple-300 opacity-50 transition-all duration-200 ease-in-out"
            style={{ width: `${hoverPercentage}%` }}
          />
        )}
        <div className="absolute inset-0 flex justify-center items-center text-white font-bold">
          {hoverPercentage !== null
            ? `${hoverPercentage}`
            : `${fillPercentage}`}
        </div>
      </div>
    </div>
  );
};

export default AnimatedProgressBar;
