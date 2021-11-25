interface PageControllerProps {
  onPrevPress(): void;
  isOnFirstPage: boolean;
  label: string;
  onNextPress(): void;
  isOnLastPage: boolean;
}
