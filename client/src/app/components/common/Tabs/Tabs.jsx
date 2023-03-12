import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs as ReactTabs } from "react-tabs";
import "./styles/tabs.css";

const Tabs = ({ options, ...rest }) => {
    const [value, setValue] = useState(0);

    const handleChange = (page) => {
        setValue(page);
    };

    return (
        <ReactTabs selectedIndex={value} onSelect={handleChange}>
            <div className="tabs-header">
                <TabList className="tab-list">
                    {options.map((tab) => (
                        <Tab
                            key={tab.name}
                            className={`tab-list__item second ${
                                tab._id === value ? "selected" : ""
                            }`}
                        >
                            {tab.name}
                        </Tab>
                    ))}
                </TabList>
            </div>
            {options.map((option, index) => (
                <div
                    key={option.name}
                    role="tabpanel"
                    hidden={value !== index}
                    {...rest}
                >
                    <TabPanel key={option.name} className={"tab-list__panel"}>
                        {option.component}
                    </TabPanel>
                </div>
            ))}
        </ReactTabs>
    );
};

export default Tabs;
