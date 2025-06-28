import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LendingAllScreen from '~features/product/LendingAllScreen';
import LendingDeletedScreen from '~features/product/LendingDeletedScreen';
import LendingInitScreen from '~features/product/LendingInitScreen';
import { LendingTabParamList } from '~hooks/useMainNavigation';

const Tab = createMaterialTopTabNavigator<LendingTabParamList>();

export default function LendingTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="LendingAll" component={LendingAllScreen} />
            <Tab.Screen name="LendingInit" component={LendingInitScreen} />
            <Tab.Screen name="LendingDeleted" component={LendingDeletedScreen} />
        </Tab.Navigator>
    );
}
