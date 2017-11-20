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

export interface NavbarCodeProps {
  history: History;
  onCamera?: () => void;
  onUpload?: () => void;
}

export interface NavbarCodeState {}

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

class Navbar extends React.Component<NavbarCodeProps, NavbarCodeState> {
  constructor(props: NavbarCodeProps) {
    super(props);

    this.onNewAndHome = this.onNewAndHome.bind(this);
  }

  public render() {
    return (
      <nav className="pt-navbar pt-dark">
        <div className="pt-navbar-group pt-align-left">
          <Button
            onClick={this.onNewAndHome}
            className="pt-minimal"
          >
            Whiteboard Live Coding
          </Button>
        </div>
        <div className="pt-navbar-group pt-align-right">
          <Button className="pt-minimal" iconName="code-block">
            Templates
          </Button>
          <Button
            className="pt-minimal"
            iconName="pt-icon-add"
            onClick={this.onNewAndHome}
          >
            New
          </Button>
          <Popover
            content={settingsMenu}
            position={Position.BOTTOM_RIGHT}
            interactionKind={PopoverInteractionKind.HOVER}
          >
            <Button className="pt-minimal" iconName="pt-icon-cog">
              Settings
            </Button>
          </Popover>
        </div>
      </nav>
    );
  }

  private onNewAndHome() {
    this.props.history.push('/');
  }
}

export default Navbar;
