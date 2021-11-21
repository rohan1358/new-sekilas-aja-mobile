import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/core";
import { StackScreenProps } from "@react-navigation/stack";
import { MainBottomTabParamList, RootStackParamList } from "../../types";

type NavProps = CompositeScreenProps<
  BottomTabScreenProps<MainBottomTabParamList, "Explore">,
  StackScreenProps<RootStackParamList>
>;

interface ExploreProps extends NavProps {}
