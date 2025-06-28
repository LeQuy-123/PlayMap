import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '~features/home/HomeScreen';
import ProfileScreen from '~features/profile/ProfileScreen';
import { CardStyleInterpolators, createStackNavigator, TransitionSpecs as StackTransition } from '@react-navigation/stack';
import { MainStackParamList, MainTabParamList } from '~hooks/useMainNavigation';
import ExchangeScreen from '~features/exchange/ExchangeScreen';
import SettingScreen from '~features/setting/SettingScreen';
import { useTranslation } from 'react-i18next';
import typography from '~theme/typography';
import { Image, Text } from 'react-native';
import IMAGES from '~constants/images';
import colors from '~theme/colors';
import { LabelPosition } from 'node_modules/@react-navigation/bottom-tabs/lib/typescript/src/types';
import { TransitionSpecs as BottomTabTransition } from '@react-navigation/bottom-tabs';
import MapScreen from '~features/map/MapScreen';

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
    return ({ focused }: {
        focused: boolean;
        color: string;
        size: number;
    }) => (
        <Image
            source={focused ? selectedIcon : defaultIcon}
            style={{ width: 22, height: 22 }}
            resizeMode="contain"
        />
    );
};
const createTabLabel = (label: string) => {
    return ({ focused }: {
        focused: boolean;
        color: string;
        position: LabelPosition;
        children: string;
    }) => (
        <Text style={{
            fontSize: typography.fontSize.xs,
            color: focused ? colors.primary : colors.gray,
        }}>{label}</Text>
    );
};
const tabConfig: TabItem[] = [
    {
        name: 'Home',
        component: HomeScreen,
        labelKey: 'home',
        icon: {
            default: IMAGES.BOTTOM_TAB.HOME,
            selected: IMAGES.BOTTOM_TAB.HOME_SELECTED,
        },
    },
    {
        name: 'Map',
        component: MapScreen,
        labelKey: 'product',
        icon: {
            default: IMAGES.BOTTOM_TAB.PRODUCT,
            selected: IMAGES.BOTTOM_TAB.PRODUCT_SELECTED,
        },
    },
    {
        name: 'Exchange',
        component: ExchangeScreen,
        labelKey: 'exchange_rate',
        icon: {
            default: IMAGES.BOTTOM_TAB.EXCHANGE,
            selected: IMAGES.BOTTOM_TAB.EXCHANGE_SELECTED,
        },
    },
    {
        name: 'Profile',
        component: ProfileScreen,
        labelKey: 'me',
        icon: {
            default: IMAGES.BOTTOM_TAB.ME,
            selected: IMAGES.BOTTOM_TAB.ME_SELECTED,
        },
    },
    {
        name: 'Setting',
        component: SettingScreen,
        labelKey: 'setting',
        icon: {
            default: IMAGES.BOTTOM_TAB.SETTING,
            selected: IMAGES.BOTTOM_TAB.SETTING_SELECTED,
        },
    },
];

export const MainTab = () => {
    const { t } = useTranslation();

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
                transitionSpec: BottomTabTransition.ShiftSpec,
            }}
        >
            {tabConfig.map(tab => (
                <Tab.Screen
                    key={tab.name}
                    name={tab.name}
                    component={tab.component}
                    options={{
                        tabBarLabel: createTabLabel(t(tab.labelKey)),
                        tabBarAccessibilityLabel: t(tab.labelKey),
                        tabBarLabelStyle: { fontSize: typography.fontSize.xs, color: colors.primary },
                        tabBarIcon: createTabIcon(tab.icon.default, tab.icon.selected),
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};
const Stack = createStackNavigator<MainStackParamList>();

export const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: {
                open: StackTransition.TransitionIOSSpec,
                close: StackTransition.TransitionIOSSpec,
            },
        }}>
            <Stack.Screen name="Main" component={MainTab} />
            {/* <Stack.Screen name="ProductDetail" component={ProductDetail} options={{
                headerShown: true,
                headerBackButtonDisplayMode: 'minimal',
            }} /> */}
        </Stack.Navigator>
    );
};
