import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DashboardScreen, UserScreen} from '../../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Image} from 'react-native';

const Tab = createBottomTabNavigator();

export const TabScreen = ({route}) => {
  const {userData, projects} = route.params;
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          tabBarStyle: {
            paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          },
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = focused ? 'md-checkmark-circle' : 'ios-home-outline';
            } else if (route.name === 'Login') {
              iconName = focused ? 'ios-log-in' : 'ios-log-in-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen
          name="Dashboard"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({focused}) => (
              <View>
                <Image
                  source={require('../../assets/house.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    tintColor: focused ? '#0079ff' : '#b8bcc7',
                  }}></Image>
              </View>
            ),
          }}
          initialParams={{userData: userData, projects: projects}}
          component={DashboardScreen}
        />
        <Tab.Screen
          name="User"
          options={{
            title: 'User',
            tabBarIcon: ({focused}) => (
              <View>
                <Image
                  source={require('../../assets/user.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    tintColor: focused ? '#0079ff' : '#b8bcc7',
                  }}></Image>
              </View>
            ),
          }}
          initialParams={{userData: userData, projects: projects}}
          component={UserScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
