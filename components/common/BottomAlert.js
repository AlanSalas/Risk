import React from 'react';
import { View, Text } from 'react-native';


const BottomAlert = ({ text, show, success }) => {
    if (show) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                width: '100%',
                marginBottom: 0
            }}>

                <View style={{ 
                     backgroundColor: success ? 'green' :  'red',
                     height: '30%'}}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>{text}</Text>
                </View>
            </View>
        );
    } else {
        return null;
    }

};


export { BottomAlert };