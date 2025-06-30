import React, { useState, useEffect } from "react";

interface Roadmap {
  id: string;
  title: string;
  [key: string]: any;
}

interface RoadmapsProps {
  roadmaps: Roadmap[];
}

const Roadmaps: React.FC<RoadmapsProps> = ({ roadmaps }) => {


  return (
    <div className="border border-gray-300 p-2 bg-white rounded">
      <div className="text-2xl font-semibold text-gray-700 mb-2">Roadmaps</div>
    </div>
  );
};

export default Roadmaps;
