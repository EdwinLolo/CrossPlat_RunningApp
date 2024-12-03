import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const styles = StyleSheet.create({
  listItemContainer: {
    width: "80%",
    backgroundCOlor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
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
          <ListItem
            key={index}
            bottomDivider
            onPress={item.onPress}
            containerStyle={styles.listItemContainer}
          >
            <ListItem.Content>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {item.iconLibrary === "FontAwesome6" && (
                  <FontAwesome6 name={item.iconName} size={24} color="black" />
                )}
                {item.iconLibrary === "Ionicons" && (
                  <Ionicons name={item.iconName} size={24} color="gray" />
                )}
                {item.iconLibrary === "FontAwesome" && (
                  <FontAwesome name={item.iconName} size={24} color="yellow" />
                )}
                <ListItem.Title style={{ marginLeft: 10 }}>
                  {item.title}
                </ListItem.Title>
              </View>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
    </View>
  );
};

export default ProfileOptions;
