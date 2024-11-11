"use client";

import BorderButton from "@/components/shared/Button/BorderButton";
import { AnnouncementTabs } from "@/constants";
import React, { useState } from "react";

const BIGEXERCISES = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(
    AnnouncementTabs[0].value
  );

  return (
    <div>
      <div className="flex gap-2">
        {AnnouncementTabs.map((item) => {
          return (
            <BorderButton
              key={item.value}
              text={item.label}
              value={item.value}
              onClick={(value) => {
                setSelectedAnnouncement(value);
              }}
              isActive={selectedAnnouncement === item.value}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BIGEXERCISES;
