import * as React from 'react';
import { Intent } from '@blueprintjs/core';

import { OSDiv, OSHeading } from './styled';

export interface OutputSpaceProps {
  heading: string;
  text: string;
  intent: Intent;
}

function OutputSpace(props: OutputSpaceProps) {
  const { heading, text, intent } = props;

  return (
    <OSDiv intent={intent}>
      <div className="row">
        <OSHeading className="col">
          <h4 className="text-center">{heading}</h4>
        </OSHeading>
      </div>
      <div className="container-fluid">
        <p className="pt-monospace-text">{text}</p>
      </div>
    </OSDiv>
  );
}

export default OutputSpace;
