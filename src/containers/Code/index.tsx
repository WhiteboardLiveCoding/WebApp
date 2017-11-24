import * as React from 'react';
import { Intent, Button } from '@blueprintjs/core';
import * as CodeMirror from 'react-codemirror';
import 'codemirror/mode/python/python';
import 'codemirror/theme/monokai.css';
import { History } from 'history';
import axios, { AxiosResponse, AxiosError } from 'axios';

import { CMDiv, MonokaiDiv, CodeImage } from './styled';
import Navbar from '../../components/Navbar/code';
import OutputSpace from '../../components/OutputSpace';
import { SubmitToaster } from '../../components/Toasts';

const API_RESUBMIT = 'http://whiteboardlivecoding-ocr.azurewebsites.net/api/resubmit_code';

export interface CodeContainerProps {
  history: History;
}

export interface CodeContainerState {
  ar: {};
  result: string;
  error: string;
  fixed: string;
  key: string;
  code: string;
  apiError?: AxiosError;
}

class Code extends React.Component<CodeContainerProps, CodeContainerState> {
  static state = {
    ar: '',
    result: '',
    error: '',
    fixed: '',
    key: '',
    editor: ''
  };

  constructor(props: CodeContainerProps) {
    super(props);

    if (!props.history.location.state) {
      props.history.push('/');
    }

    this.state = {
      ...props.history.location.state,
      code: props.history.location.state.fixed
    };

    this.onResubmit = this.onResubmit.bind(this);
  }

  public render() {
    const options = {
      lineNumbers: true,
      mode: 'python',
      theme: 'monokai'
    };

    const {
      result,
      error,
      key,
      code
    } = this.state;

    let codeImage: string = key ?
      `https://alpstore.blob.core.windows.net/pictures/${key}` :
      'http://i316.photobucket.com/albums/mm347/baby-bits-n-bobs/Imagehere.jpg';

    return (
      <div>
        <Navbar history={this.props.history} />
        <div className="row no-gutters">
          <CMDiv className="col">
            <CodeMirror ref={this.onCodeMirrorRef} options={options} value={code} />
            <Button
              iconName="refresh"
              className="pt-large"
              intent={Intent.SUCCESS}
              onClick={this.onResubmit}
            >
              Resubmit
            </Button>
          </CMDiv>
          <MonokaiDiv className="col">
            <CodeImage src={codeImage} />
          </MonokaiDiv>
        </div>
        <div className="row no-gutters">
          <div className="col">
            <OutputSpace
              heading="Output"
              text={result}
              intent={error === 'No error detected' ? Intent.SUCCESS : Intent.DANGER}
            />
          </div>
        </div>
      </div>
    );
  }

  private onCodeMirrorRef = (ref: ReactCodeMirror.ReactCodeMirror) => {
    if (ref !== null) {
      const cm = ref.getCodeMirror();
      cm.setSize(null, 500);
    }
  }

  private onResubmit() {
    SubmitToaster.show({
      message: 'Submitting...',
      intent: Intent.PRIMARY,
      iconName: 'upload'
    });

    const payload = {
      code: this.state.code,
      key: this.state.key
    };

    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios.post(API_RESUBMIT, payload, options)
      .then((resp: AxiosResponse) => {
        this.setState({
          ...resp.data
        });

        setTimeout(
          () => {
            SubmitToaster.show({
              message: 'Success!',
              intent: Intent.SUCCESS,
              iconName: 'tick-circle'
            });
          },
          500);
      }).catch((apiError: AxiosError) => {
        this.setState({
          apiError
        });

        setTimeout(
          () => {
            SubmitToaster.show({
              message: 'Oops! Something went wrong.',
              intent: Intent.DANGER,
              iconName: 'error'
            });
          },
          500);
      });

  }

}

export default Code;
