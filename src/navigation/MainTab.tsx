import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '~features/profile/components/ProfileScreen';
import {
    CardStyleInterpolators,
    createStackNavigator,
    TransitionSpecs as StackTransition,
} from '@react-navigation/stack';
import {MainStackParamList, MainTabParamList} from '~hooks/useMainNavigation';
import {useTranslation} from 'react-i18next';
import typography from '~theme/typography';
import {Text} from 'react-native';
import colors from '~theme/colors';
import {LabelPosition} from 'node_modules/@react-navigation/bottom-tabs/lib/typescript/src/types';
import MapScreen from '~features/map/components/MapScreen';
import ScoreboardScreen from '~features/scroeboard/ScoreboardScreen';
import MatchScreen from '~features/matchs/MatchScreen';
import Icon from '@react-native-vector-icons/material-design-icons';

const Tab = createBottomTabNavigator<MainTabParamList>();
type TabKey = keyof MainTabParamList;

type TabItem = {
    name: TabKey;
    component: React.ComponentType<any>;
    labelKey: string;
    icon: {
        default: any;
        selected: any;
    };
};
const createTabIcon = (defaultIcon: any, selectedIcon: any) => {
    return ({focused}: {focused: boolean; color: string; size: number}) => {
        if (focused) return selectedIcon;
        return defaultIcon;
    };
};
const createTabLabel = (label: string) => {
    return ({
        focused,
    }: {
        focused: boolean;
        color: string;
        position: LabelPosition;
        children: string;
    }) => (
        <Text
            style={{
                fontSize: typography.fontSize.xs,
                color: focused ? colors.primary : colors.gray,
            }}>
            {label}
        </Text>
    );
};
const tabConfig: TabItem[] = [
    {
        name: 'Map',
        component: MapScreen,
        labelKey: 'map',
        icon: {
            default: <Icon name={'compass'} size={26} />,
            selected: (
                <Icon name={'compass'} size={26} color={colors.primary} />
            ),
        },
    },
    {
        name: 'Matches',
        component: MatchScreen,
        labelKey: 'matches',
        icon: {
            default: <Icon name={'fencing'} size={26} />,
            selected: (
                <Icon name={'fencing'} color={colors.primary} size={26} />
            ),
        },
    },
    {
        name: 'Scoreboard',
        component: ScoreboardScreen,
        labelKey: 'scoreboard',
        icon: {
            default: <Icon name={'scoreboard'} size={26} />,
            selected: (
                <Icon name={'scoreboard'} color={colors.primary} size={26} />
            ),
        },
    },
    {
        name: 'Profile',
        component: ProfileScreen,
        labelKey: 'profile',
        icon: {
            default: <Icon name={'account-circle'} size={26} />,
            selected: (
                <Icon
                    name={'account-circle'}
                    color={colors.primary}
                    size={26}
                />
            ),
        },
    },
];

export const MainTab = () => {
    const {t} = useTranslation();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
                tabBarStyle: {
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    backgroundColor: '#fff',
                    position: 'absolute',
                    overflow: 'hidden',
                },
                headerStyle: {
                    backgroundColor: 'transparent',
                    elevation: 0,
                    shadowOpacity: 0,
                },
            }}>
            {tabConfig.map(tab => (
                <Tab.Screen
                    key={tab.name}
                    name={tab.name}
                    component={tab.component}
                    options={{
                        tabBarLabel: createTabLabel(t(tab.labelKey)),
                        tabBarAccessibilityLabel: t(tab.labelKey),
                        tabBarLabelStyle: {
                            fontSize: typography.fontSize.xs,
                            color: colors.primary,
                        },
                        tabBarIcon: createTabIcon(
                            tab.icon.default,
                            tab.icon.selected,
                        ),
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};
const Stack = createStackNavigator<MainStackParamList>();

export const MainStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: StackTransition.TransitionIOSSpec,
                    close: StackTransition.TransitionIOSSpec,
                },
            }}>
            <Stack.Screen name="Main" component={MainTab} />
        </Stack.Navigator>
    );
};
