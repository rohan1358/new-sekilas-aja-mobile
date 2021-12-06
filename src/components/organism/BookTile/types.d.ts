interface BookTileProps {
  title: string;
  author: string;
  duration: number;
  cover: string | undefined;
  isVideoAvailable: boolean;
  onPress?(): void;
  navSubscrive?(): void;
}
