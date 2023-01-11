import { Icon } from '@rneui/themed'
import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export default function FormUploadFile() {

    function uploadCSV() {
        // TODO: parse csv file and extract cards
        console.log('Uploading from CSV');
    }

  return (
    <View style={styles.uploadFileWrapper}>
        <Text style={{fontWeight: '700'}}>Upload Cards</Text>
        <TouchableWithoutFeedback onPress={uploadCSV}>
            <View style={styles.iconWrapper}>
                <Icon name='upload-file' type='material' color='black' size={30}/>
            </View>
        </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
    uploadFileWrapper: {
        flexDirection: 'row',
        width: '80%',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconWrapper: {
        padding: 10,
    }
});
