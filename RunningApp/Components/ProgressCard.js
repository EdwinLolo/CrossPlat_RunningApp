import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const ProgressCard = () => {
  return (
    <View style= {{ justifyContent:'center', alignItems:'center'}}>     
        <View style={{ backgroundColor: '#f0f0f0', padding: 16, borderRadius: 10, width:'80%', borderWidth: 2, borderColor: '#AAC7D7'}}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total progress</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 2, borderRadius: 10, padding: 10, borderColor: '#AAC7D7'}}>
            <View style={{ alignItems: 'center' }}>
            <FontAwesome5 name="running" size={24} color="black" />
            <Text>103,2 km</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
            <FontAwesome5 name="stopwatch" size={24} color="black" />
            <Text>16,9 hr</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
            <FontAwesome5 name="fire" size={24} color="red" />
            <Text>1,5k kcal</Text>
            </View>
        </View>
        </View>
    </View>
  );
};

export default ProgressCard;