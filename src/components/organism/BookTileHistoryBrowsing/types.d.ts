interface BookTileProps {
  title: string;
  author: string;
  duration: number;
  progress: any;
  cover: string | undefined;
  isVideoAvailable: boolean;
  onPress(arg0: string): void;
  navSubscrive?(): void;
  onPressDone(arg0: string): void;
}
