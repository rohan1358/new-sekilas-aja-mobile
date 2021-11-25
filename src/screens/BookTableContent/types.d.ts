import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

type Props = StackScreenProps<RootStackParamList, "BookTableContent">;

interface BookTableOfContentProps {
  id: string;
  title: string;
  kilas: string;
}

interface BookTableContentProps extends Props {}
