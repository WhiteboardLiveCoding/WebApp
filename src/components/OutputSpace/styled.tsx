import { Intent } from '@blueprintjs/core';
import styled from 'styled-components';

interface OSProps {
  intent?: Intent;
}

export const OSDiv = styled.div`
  margin: 20px;
  border: 1px solid ${(props: OSProps) => props.intent === Intent.DANGER ? '#DB3737' : '#0F9960'};
`;

export const OSHeading = styled.div`
  padding: 10px 0px;
`;
