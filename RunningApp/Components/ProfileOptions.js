import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    listItemContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listItemTitle: {
        marginLeft: 10,
    },
    chevronIcon: {
        marginLeft: 'auto',
    },
});	

const CustomListItem = ({ title, iconLibrary, iconName, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.listItemContainer}>
        <View style={styles.listItemContent}>
          {iconLibrary === "FontAwesome6" && (
            <FontAwesome6 name={iconName} size={24} color="black" />
          )}
          {iconLibrary === "Ionicons" && (
            <Ionicons name={iconName} size={24} color="gray" />
          )}
          {iconLibrary === "FontAwesome" && (
            <FontAwesome name={iconName} size={24} color="yellow" />
          )}
          <Text style={styles.listItemTitle}>{title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="gray" style={styles.chevronIcon} />
      </TouchableOpacity>
    );
};

const ProfileOptions = () => {
    const navigation = useNavigation();

    const optionsData = [
        { 
            title: 'My Community', 
            iconLibrary: 'FontAwesome6', 
            iconName: 'people-group', onPress: () => navigation.navigate('Community') 
        },
        { 
            title: 'Run Records', 
            iconLibrary: 'FontAwesome6', 
            iconName: 'person-running', onPress: () => navigation.navigate('History') 
        },
        { 
            title: 'Settings', 
            iconLibrary: 'Ionicons', 
            iconName: 'settings-sharp', onPress: () => console.log('Settings') 
        },
        { 
            title: 'Ratings', 
            iconLibrary: 'FontAwesome', 
            iconName: 'star', onPress: () => console.log('Ratings') 
        },
    ];

    return (
        <View>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                {optionsData.map((item, index) => (
                    <CustomListItem
                        key={index}
                        title={item.title}
                        iconLibrary={item.iconLibrary}
                        iconName={item.iconName}
                        onPress={item.onPress}
                    />
                ))}
            </View>
        </View>
    );
};

export default ProfileOptions;