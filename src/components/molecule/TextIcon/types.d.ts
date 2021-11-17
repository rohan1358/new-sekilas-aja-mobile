interface TextIconValue {
  label: string;
  id: string;
}

interface TextIconProps {
  onPress(arg0: TextIconValue): void;
  item: TextIconValue;
}
