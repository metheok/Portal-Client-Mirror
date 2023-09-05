import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import ChangePassWord from "../ChangePassWord/ChangePassWord";

export default function UpdatePassword({ navigate, isMobile }) {

  console.log(isMobile);
  return (
    <div>
      {isMobile ?
        (
          <>
            <ChangePassWord navigate={navigate} isMobile={isMobile} />
          </>
        )
        :
        (
          <>
            <Tabs id="controlled-tab" className="mb-3">
              <Tab eventKey="password" title="Change Password">
                <ChangePassWord navigate={navigate} isMobile={isMobile} />
              </Tab>
            </Tabs>
          </>
        )}

    </div>
  );
}
