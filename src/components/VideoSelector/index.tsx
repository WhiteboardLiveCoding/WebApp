import * as React from 'react';
import { Button, Icon, MenuItem } from '@blueprintjs/core';
import { Select, ISelectItemRendererProps } from '@blueprintjs/labs';

const VideoSelect = Select.ofType<MediaDeviceInfo>();

interface VideoSelectorProps {}
interface VideoSelectorState {
  selectedVideoDevice?: MediaDeviceInfo;
  // tslint:disable-next-line
  videoDevices?: any;
}

class VideoSelector extends React.Component<VideoSelectorProps, VideoSelectorState> {
  constructor(props: VideoSelectorProps) {
    super(props);

    this.state = {
      selectedVideoDevice: undefined,
      videoDevices: []
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.getVideoDevices = this.getVideoDevices.bind(this);
  }

  public componentWillMount() {
    this.getVideoDevices();
  }

  public render() {
    const { selectedVideoDevice, videoDevices } = this.state;

    return (
      <VideoSelect
        items={videoDevices}
        noResults={<MenuItem disabled={true} text="No video devices" />}
        filterable={false}
        itemRenderer={this.renderItem}
        onItemSelect={this.handleValueChange}
      >
        <Button iconName="camera">
          {selectedVideoDevice ? selectedVideoDevice.label : 'No video devices'}
          <Icon iconName="caret-down" className="pt-align-right"/>
        </Button>
      </VideoSelect>
    );
  }

  private renderItem({
    handleClick,
    isActive,
    item: video
  }: ISelectItemRendererProps<MediaDeviceInfo>) {

    return (
      <MenuItem
          key={video.deviceId}
          onClick={handleClick}
          text={`${video.label}`}
      />
    );
  }

  private handleValueChange(selectedVideoDevice: MediaDeviceInfo) {
    this.setState({
      selectedVideoDevice
    });
  }

  private getVideoDevices() {
    navigator.mediaDevices.enumerateDevices()
      .then((devices: MediaDeviceInfo[]) => {
        return devices.filter((device: MediaDeviceInfo) => device.kind === 'videoinput');
      }).then((videoDevices: MediaDeviceInfo[]) => {
        if (videoDevices.length > 0) {
          this.setState({
            selectedVideoDevice: videoDevices[0],
            videoDevices
          });
        } else {
          this.setState({
            selectedVideoDevice: undefined,
            videoDevices: []
          });
        }
      });
  }
}

export default VideoSelector;
