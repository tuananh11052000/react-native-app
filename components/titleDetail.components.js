import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Platform,
    Image
} from 'react-native';
import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
const UselessTextInput = (props) => {
    return (
        <TextInput
            placeholder="Mô tả hoặc ghi chú"
            {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
            editable
        />
    );
}
const titleDetail = (props) => {
    const [number, onChangeNumber] = React.useState(null);
    const [value, onChangeText] = React.useState(null);

    const { dispatch } = props;
    return (
        <View style={styles.container}>
            <View>
                <Text>Tiêu đề*</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => dispatch({ type: 'GET_TITLE', title: text })}
                    value={number}
                    placeholder="Lời nhắn"
                />
            </View>
            <View>
                <Text>Ghi chú thêm(nếu có)</Text>
                <View
                    style={styles.inputDescription}>
                    <UselessTextInput
                        multiline
                        numberOfLines={4}
                        onChangeText={(text) => dispatch({ type: 'GET_NOTE', note: text })}
                    />
                </View>
            </View>
            <View>
                <Text>Hình ảnh(tối đa 5 hình ảnh)</Text>

                <TouchableOpacity style={styles.borderUpload}>
                    <AntDesign name="clouduploado" size={70} color="#B1B1B1" />
                </TouchableOpacity>

            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        marginRight: 20,
        marginLeft: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
        borderColor: '#B1B1B1',
    },
    inputDescription: {
        borderColor: '#B1B1B1',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    borderUpload: {
        width: '25%',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#B1B1B1',
        borderWidth: 2,
        marginTop: 10,
        marginBottom: 10,
        padding: 5,
    }
});
export default connect(function (state) {
    return { inforPost: state.infoPost }
})(titleDetail);