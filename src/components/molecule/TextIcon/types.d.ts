import { ReactElement } from "react";

interface TextIconValue {
  label: string;
  id: string;
}

interface TextIconProps {
  onPress?(arg0: TextIconValue): void;
  Icon?: ReactElement;
  item: TextIconValue;
}
