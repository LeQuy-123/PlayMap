import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
export type AuthStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
};

export type MainTabParamList = {
  Scoreboard: undefined;
  Profile: undefined;
  Matches: undefined;
  Map: undefined;
};
export type MainStackParamList = {
  Main: undefined;
  // lending feature
  ProductDetail: undefined;
};
type CombinedMainNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  StackNavigationProp<MainStackParamList>
>;
const useMainNavigation = () => {
  const navigation = useNavigation<CombinedMainNavigationProp>();
  const authNavigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  return {
    navigation,
    authNavigation,
  };
};
export default useMainNavigation;
