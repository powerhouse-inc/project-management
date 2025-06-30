import {
  actions,
} from "../../../document-models/scope-of-work/index.js";
import { Textarea, TextInput } from "@powerhousedao/document-engineering";
import React, { useState, useEffect } from "react";

interface Roadmap {
  id: string;
  title: string;
  description?: string;
  [key: string]: any;
}

interface RoadmapsProps {
  roadmaps: Roadmap[];
  dispatch: any;
}

const Roadmaps: React.FC<RoadmapsProps> = ({ roadmaps, dispatch }) => {
  const roadmap = roadmaps[0];

  // Controlled state for title and description
  const [title, setTitle] = useState(roadmap?.title || "");
  const [description, setDescription] = useState(roadmap?.description || "");
  const [slug, setSlug] = useState(roadmap?.slug || "");

  // Update state when roadmap changes
  useEffect(() => {
    setTitle(roadmap?.title || "");
    setDescription(roadmap?.description || "");
    setSlug(roadmap?.slug || "");
  }, [roadmap?.id]);

  return (
    <div className="border border-gray-300 p-2 rounded-md">
      <div className="mt-2">
        <TextInput
          className="w-full"
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={(e) => {
            dispatch(actions.editRoadmap({ id: roadmap.id, title: e.target.value }));
          }}
        />
      </div>
      <div className="mt-2">
        <TextInput
          className="w-full"
          label="Slug"
          value={slug}
          onChange={e => setSlug(e.target.value)}
          onBlur={(e) => {
            dispatch(actions.editRoadmap({ id: roadmap.id, slug: e.target.value }));
          }}
        />
      </div>
      <div className="mt-4">
        <Textarea
          className="w-full"
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          onBlur={(e) => {
            dispatch(actions.editRoadmap({ id: roadmap.id, description: e.target.value }));
          }}
        />
      </div>
    </div>
  );
};

export default Roadmaps;
