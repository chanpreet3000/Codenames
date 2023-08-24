import React, { useEffect, useState } from "react";
import "./styles.css";

export default function Settings({ admin, onSettingsChange, values }) {
  const [settings, setSettings] = useState({});
  const settingsOptions = [
    {
      name: "Total words",
      options: [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34],
    },
    {
      name: "Time to guess words",
      options: [15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180],
    },
    {
      name: "Elimination Word",
      options: ["True", "False"],
    },
  ];

  const handleOptionChange = (name, value) => {
    const newSettings = {
      ...settings,
      [name]: value,
    };
    setSettings(newSettings);
  };

  useEffect(() => {
    onSettingsChange(settings);
  }, [settings]);

  return (
    <div className="create-room__settings-wrapper">
      {settingsOptions.map((ele, ind) => {
        return (
          <div className="create-room__settings-item" key={ind}>
            <div className="create-room__settings-item-name">{ele.name}</div>
            <div>
              <select
                value={values[ele.name]}
                onChange={(e) => handleOptionChange(ele.name, e.target.value)}
                disabled={!admin}
              >
                {ele.options.map((option) => {
                  return (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        );
      })}
    </div>
  );
}
