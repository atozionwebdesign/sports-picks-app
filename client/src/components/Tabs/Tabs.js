import { useState } from "react";

import BootstrapTab from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import BootstrapTabs from "react-bootstrap/Tabs";
import Tab from "../Tab/Tab";

import "./Tabs.css";
// External data and functions
import { sports } from "../../data/Data";
import { capitalizeFirstLetter } from "../../utils/HelperFunctions";

const Tabs = () => {
  const [activeTabId, setActiveTabId] = useState(0);
  sports.sort();

  const tabOnClick = (id) => {
    console.log(id);
    setActiveTabId(id);
  };

  return (
    <>
      <BootstrapTab.Container>
        <Row className="no-margin">
          <Col sm={2} style={{ paddingRight: "0" }}>
            <Nav variant="pills" className="flex-column sport-nav">
              <p
                className="left magenta-text bold table-title"
                style={{ marginBottom: "0" }}
              >
                SPORTS
              </p>
              {sports.map((data, index) => (
                <Nav.Item className="sport-item" key={"item" + index}>
                  <Nav.Link key={index} eventKey={data}>
                    {data}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm={10}>
            <BootstrapTab.Content>
              {sports.map((data, index) => (
                <BootstrapTab.Pane key={index} eventKey={data}>
                  <Tab sport={data} />
                </BootstrapTab.Pane>
              ))}
            </BootstrapTab.Content>
          </Col>
        </Row>
      </BootstrapTab.Container>
    </>
  );
};

export default Tabs;
