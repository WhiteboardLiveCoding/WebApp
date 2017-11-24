import * as React from 'react';
import { Spinner } from '@blueprintjs/core';

export interface CameraState {
  videoSrc: string | undefined;
  videoErr: boolean;
}

export interface CameraProps {}

class Camera extends React.Component<CameraProps, CameraState> {
  public video: HTMLVideoElement;

  constructor(props: CameraProps) {
    super(props);

    this.state = {
      videoSrc: undefined,
      videoErr: false
    };

    this.handleVideo = this.handleVideo.bind(this);
    this.onVideoRef = this.onVideoRef.bind(this);
  }

  public componentDidMount() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(this.handleVideo)
      .catch(this.videoError);
  }

  public render() {
    let videoElement = <Spinner />;

    if (this.state.videoSrc) {
      videoElement = (
        <video
           ref={this.onVideoRef}
           src={this.state.videoSrc}
           height="100%"
           width="100%"
           autoPlay={true}
        />
      );
    }

    return (
      <div>
        {videoElement}
      </div>
    );
  }

  private onVideoRef(ref: HTMLVideoElement) {
    this.video = ref;
  }

  private handleVideo(stream: MediaStream) {
    this.setState({
      videoSrc: window.URL.createObjectURL(stream),
      videoErr: false
    });
  }

  private videoError(err: {}) {
    this.setState({
      videoErr: true
    });
  }
}

export default Camera;
