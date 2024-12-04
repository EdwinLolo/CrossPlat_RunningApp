import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome6, Ionicons, FontAwesome } from "@expo/vector-icons";

const styles = StyleSheet.create({
  listItemContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  listItemTitle: {
    marginLeft: 10,
  },
});

const CustomListItem = ({ title, iconLibrary, iconName, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.listItemContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
    </TouchableOpacity>
  );
};

const ProfileOptions = () => {
  const optionsData = [
    {
      title: "My Community",
      iconLibrary: "FontAwesome6",
      iconName: "people-group",
      onPress: () => console.log("My Community"),
    },
    {
      title: "Run Records",
      iconLibrary: "FontAwesome6",
      iconName: "person-running",
      onPress: () => console.log("Run Records"),
    },
    {
      title: "Settings",
      iconLibrary: "Ionicons",
      iconName: "settings-sharp",
      onPress: () => console.log("Settings"),
    },
    {
      title: "Ratings",
      iconLibrary: "FontAwesome",
      iconName: "star",
      onPress: () => console.log("Ratings"),
    },
  ];

  return (
    <View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
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
