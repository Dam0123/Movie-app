import React, { useLayoutEffect } from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import Favs from "../screens/Favs";

const Tabs = createBottomTabNavigator();

const getHeaderName = route =>
route?.state?.routeNames[route.state.index] || "Movies"

export default ({navigation, route}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: getHeaderName(route)
    });
 }, [route]);
    return (   
        <Tabs.Navigator screenOptions={({route})=> ({
            
            tabBarShowLabel: false,
            "tabBarStyle": [{
                "display": "flex",
                backgroundColor: "black",
                borderTopColor:"black"
            }],
            tabBarIcon: ({focused})=> {
                let iconName = Platform.OS === "ios" ? "ios-" : "md-";
                if (route.name === "Movies") {
                    iconName += "film";
                } else if (route.name === "Tv"){
                    iconName += "tv";
                } else if (route.name === "Search"){
                    iconName += "search";
                } else if (route.name === "Favourites"){
                    iconName += "heart";
                }
                
                return <Ionicons 
                name={iconName} 
                color={focused ? "white" : "grey"} 
                size={26}/>
            }
        })}
        
        >
            <Tabs.Screen name="Movies" component={Movies} />
            <Tabs.Screen name="Tv" component={Tv} />
            <Tabs.Screen name="Search" component={Search} />
            <Tabs.Screen name="Favourites" component={Favs} />
        </Tabs.Navigator>
    );
};
