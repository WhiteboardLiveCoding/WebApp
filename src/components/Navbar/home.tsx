import * as React from 'react';
import {
  Button,
  Popover,
  PopoverInteractionKind,
  Menu,
  MenuItem,
  Position
} from '@blueprintjs/core';
import { History } from 'history';

import VideoSelector from '../VideoSelector';

export interface NavbarHomeProps {
  history: History;
}

export interface NavbarHomeState {}

const settingsMenu = (
  <Menu>
      <MenuItem
          iconName="new-text-box"
          text="Setting 1"
      />
      <MenuItem
          iconName="new-object"
          text="Setting 2"
      />
  </Menu>
);

class Navbar extends React.Component<NavbarHomeProps, NavbarHomeState> {
  public render() {
    return (
      <nav className="pt-navbar pt-dark">
        <div className="pt-navbar-group pt-align-left">
          <Button className="pt-minimal">
            Whiteboard Live Coding
          </Button>
        </div>
        <div className="pt-navbar-group pt-align-right">
          <VideoSelector />
          <span className="pt-navbar-divider" />
          <Button className="pt-minimal" iconName="code-block">
            Templates
          </Button>
          <Popover
            content={settingsMenu}
            position={Position.BOTTOM_RIGHT}
            interactionKind={PopoverInteractionKind.HOVER}
          >
            <Button className="pt-minimal" iconName="cog">
              Settings
            </Button>
          </Popover>
        </div>
      </nav>
    );
  }
}

export default Navbar;
