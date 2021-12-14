interface BookTileProps {
  title: string;
  author: string;
  duration: number;
  cover: string | undefined;
  isVideoAvailable: boolean;
  onPress(arg0: string): void;
  navSubscrive?(): void;
}
