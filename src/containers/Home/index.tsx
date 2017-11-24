import * as React from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { History } from 'history';
import axios, { AxiosResponse, AxiosError } from 'axios';
import * as annyang from 'annyang';
import { Annyang, CommandOption } from 'annyang';

import Navbar from '../../components/Navbar/home';
import Camera from '../../components/Camera';

const API_UPLOAD = 'http://whiteboardlivecoding-ocr.azurewebsites.net/api/upload_image';

export interface HomeContainerProps {
  history: History;
}

export interface HomeContainerState {
  selectedFile: File | undefined;
  error?: AxiosError;
}

class Home extends React.Component<HomeContainerProps, HomeContainerState> {
  private jeff: Annyang;
  private camera: Camera;
  private canvas: HTMLCanvasElement;
  private blankCanvas: HTMLCanvasElement;

  constructor(props: HomeContainerProps) {
    super(props);

    this.state = {
      selectedFile: undefined
    };

    this.jeff = annyang as Annyang;
    this.onCapture = this.onCapture.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.onCanvasUpload = this.onCanvasUpload.bind(this);
    this.onCanvasRef = this.onCanvasRef.bind(this);
    this.onBlankCanvasRef = this.onBlankCanvasRef.bind(this);
    this.onFileSelect = this.onFileSelect.bind(this);
  }

  public componentWillMount() {
    if (this.jeff) {
      const commands: CommandOption = {
        'whiteboard capture': {
          'regexp': /.*whiteboard capture.*/,
          'callback': this.onCapture
        },
        'whiteboard upload': {
          'regexp': /.*whiteboard upload.*/,
          'callback': this.onCanvasUpload
        }
      };

      this.jeff.addCommands(commands);

      this.jeff.debug();
      this.jeff.start({autoRestart: true, continuous: false});
    }
  }

  public componentWillUnmount() {
    this.jeff.pause();
  }

  public render() {
    const { selectedFile } = this.state;

    return (
      <div>
        <Navbar history={this.props.history} />
        <h2>Take a picture with your webcam</h2>
        <div className="row no-gutters">
            <div className="col-md-6">
              <div className="row no-gutters">
                <Camera ref={(ref: Camera) => { this.camera = ref; }} />
              </div>
            </div>
            <div className="col-md-6">
              <canvas height={480} width={640} ref={this.onCanvasRef}/>
            </div>
        </div>
        <div className="row no-gutters">
            <div className="col-md-6">
              <div className="container">
                <Button
                  iconName="camera"
                  className="pt-large"
                  intent={Intent.SUCCESS}
                  onClick={this.onCapture}
                >
                  Capture Image
                </Button>
              </div>
            </div>
            <div className="col-md-6">
              <Button
                iconName="upload"
                className="pt-large"
                intent={Intent.SUCCESS}
                onClick={this.onCanvasUpload}
              >
                Upload
              </Button>
            </div>
        </div>
        <div className="container-fluid">
          <hr />
          <h2>Or upload an image</h2>
          <div className="col">
            <div className="pt-control-group">
              <label className="pt-file-upload pt-large">
                <input type="file" onChange={e => this.onFileSelect(e.target.files)} />
                <span className="pt-file-upload-input">
                  {selectedFile ? selectedFile.name : 'Choose file...'}
                </span>
              </label>
              <Button
                iconName="refresh"
                className="pt-large"
                intent={Intent.SUCCESS}
                onClick={this.onFileUpload}
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
        <canvas hidden={true} ref={this.onBlankCanvasRef} />
      </div>
    );
  }

  private onCanvasRef(ref: HTMLCanvasElement) {
    this.canvas = ref;
  }

  private onBlankCanvasRef(ref: HTMLCanvasElement) {
    this.blankCanvas = ref;
  }

  private onCapture() {
    if (!this.camera || !this.canvas) {
      return;
    }

    const ctx = this.canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    ctx.drawImage(this.camera.video, 0, 0, 640, 480);
  }

  private onCanvasUpload() {
    if (!this.canvas && !this.blankCanvas) {
      return;
    }

    if (this.canvas.toDataURL() === this.blankCanvas.toDataURL()) {
      return;
    }

    this.canvas.toBlob((blob: Blob) => {
      const fd = new FormData();
      fd.append('file', blob);

      axios.post(API_UPLOAD, fd)
        .then(resp => {
          this.props.history.push({
            pathname: '/code',
            state: {
              ...resp.data
            }
          });
        })
        .catch(error => {
          this.setState({
            error
          });
        });
    });
  }

  private onFileUpload() {
    if (!this.state.selectedFile) {
      return;
    }

    const fd = new FormData();
    fd.append('file', this.state.selectedFile);

    axios.post(API_UPLOAD, fd)
      .then((resp: AxiosResponse) => {
        this.props.history.push({
          pathname: '/code',
          state: {
            ...resp.data
          }
        });
      })
      .catch((error: AxiosError) => {
        this.setState({
          error
        });
      });

  }

  private onFileSelect(files: FileList | null) {
    if (files && files.length > 0) {
      this.setState({
        selectedFile: files.item(0)
      });
    }
  }
}

export default Home;
