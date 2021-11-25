interface OngoingTileProps {
  bookTitle: string | undefined;
  bookUri: string | undefined;
  onPress(): void;
  isAvailable: boolean;
}
