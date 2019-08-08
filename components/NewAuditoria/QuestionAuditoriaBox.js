/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Button,
    Share,
    Clipboard,
    Image,
    Platform
} from 'react-native';
import CustomDatePicker from './../common/CustomDatePicker';
import { CheckBox, Icon } from 'react-native-elements';
import { Camera, Constants, ImagePicker, Permissions } from 'expo';

export default class QuestionAuditoriaBox extends Component {

    constructor(props) {
        super(props);
        const { auditQuestion, answer } = props;
        this.camera = Camera;
        this.state = {
            selected: answer ? answer.auditQuestionOptionId : null,
            checked: answer ? answer.textAnswer === "true" : false,
            text: answer ? answer.textAnswer : "",
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            cameraRendered: false,
            image: null,
            uploading: false,
            images: []
        }


    }
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }
    _takePhoto = async () => {
        const {
            status: cameraPerm
        } = await Permissions.askAsync(Permissions.CAMERA);

        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only if user allows permission to camera AND camera roll
        if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
            let pickerResult = await ImagePicker.launchCameraAsync({
                allowsEditing: false,
                //aspect: [4, 3],
            });
            console.log(pickerResult);
            const list = Object.assign([], this.state.images);
            list.push(pickerResult.uri);
            this.setState({ images: list })
            this.setState({ image: pickerResult.uri })
            // this._handleImagePicked(pickerResult);
        }
    };
    renderCamera() {
        snap = async () => {
            if (this.camera) {
                let photo = await this.camera.takePictureAsync();
                console.log(photo)
            }
        };
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={async () => {
                                    let doo = await Camera.takePictureAsync();
                                    console.log(doo)
                                    /*
                                  this.setState({
                                    type: this.state.type === Camera.Constants.Type.back
                                      ? Camera.Constants.Type.front
                                      : Camera.Constants.Type.back,
                                  });*/
                                }}>
                                <Button onPress={this._takePhoto} title="Take a photo" />
                            </TouchableOpacity>

                        </View>
                    </Camera>
                </View>
            );
        }
    }
    _onPress = (text, answerId) => {
        if (answerId) {
            this.setState({ selected: answerId });
        }
        this.setState({ text: text })
        this.props.onPressItem(this.props.id, answerId, text);
    };
    _checkPress = () => {
        const newValue = !this.state.checked;
        this.setState({ checked: newValue });
        this.props.onPressItem(this.props.id, null, newValue + '')
    }

    renderOptions = (auditQuestionOptions, selectedOption) => {
        let answers = auditQuestionOptions.map((option, index) => {
            //this.setState({selected : selectedOption});
            let selected = this.state.selected == option.id ? true : false
            return (
                <View key={`option-${option.id}`} style={styles.viewButton}>
                    <TouchableHighlight style={[styles.buttonContainer, selected ? styles.optionSelected : styles.option]} onPress={event => {
                        this._onPress(null, option.id)
                    }}>
                        <Text style={styles.loginText}>{option.option}</Text>
                    </TouchableHighlight>
                </View>
            );
        }, this);

        return answers;
    }
    renderSimpleAnswer = (text) => {
        //this.setState({text});
        return (

            <TextInput
                borderBottomWidth={1}
                underlineColorAndroid='transparent'
                selectionColor={'#dd6401'}
                onChangeText={event => { this._onPress(event, null) }} value={this.state.text} ></TextInput>


        )
    }
    renderCheckAnswer = (cheched) => {
        //this.setState({checked : cheched})
        return (
            <CheckBox
                onPress={this._checkPress}
                checked={this.state.checked}
            />

        )
    }

    _renderAnswer = (auditQuestion, answer) => {
        switch (auditQuestion.questionType.name) {
            case 'options':
                const option = answer ? answer.auditQuestionOptionId : null;
                //this.setState({selected: option})
                return this.renderOptions(auditQuestion.auditQuestionOptions, option);
            case 'simple':
                const text = answer ? answer.textAnswer : "";
                //this.setState({text: text})
                return this.renderSimpleAnswer(text);
            case 'check':
                const cheched = answer ? answer.textAnswer === "true" : false;
                //this.setState({checked: cheched})
                return this.renderCheckAnswer(cheched);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { auditQuestion, answer } = nextProps;
        /* switch (auditQuestion.questionType.name) {
             case 'options':
                 const option = answer ? answer.auditQuestionOptionId : null;
                 this.setState({selected: option})
             case 'simple':
                 const text = answer ? answer.textAnswer : "";
                 this.setState({text: text})
             case 'check':
                  const cheched = answer ? answer.textAnswer === "true" : false;
                  this.setState({checked: cheched})
                 
         }*/
    }
    _maybeRenderImage = () => {
        let {
            image,
            images
        } = this.state;

        if (!image) {
            return;
        }

        return (
            <View
                style={styles.maybeRenderContainer}>
                <View
                    style={styles.maybeRenderImageContainer}>
                    {images.map((i, index) => {
                        return (
                            <Image key={`img-${index}`} source={{ uri: i }} style={styles.maybeRenderImage} />
                        )
                    })}

                </View>

                {/*
                <Text
                    onPress={this._copyToClipboard}
                    onLongPress={this._share}
                    style={styles.maybeRenderImageText}>
                    {image}
                </Text>
                  */}
            </View>

        );
    };

    _share = () => {
        Share.share({
            message: this.state.image,
            title: 'Check out this photo',
            url: this.state.image,
        });
    };

    _copyToClipboard = () => {
        Clipboard.setString(this.state.image);
        alert('Copied image URL to clipboard');
    };
    render() {
        const { auditQuestion, answer } = this.props;
        if (this.state.cameraRendered) {
            return (
                <View >
                    {this.renderCamera()}
                </View>
            )
        }
        if (auditQuestion) {
            return (
                <View style={styles.card}>
                    <Text style={styles.title}>{auditQuestion.question}</Text>
                    <View style={styles.answersContainer}>
                        {this._renderAnswer(auditQuestion, answer)}



                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end' }}>
                        <TouchableOpacity disabled={this.state.images.length === 5} onPress={this._takePhoto}>
                            <Icon
                                name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'}
                                type='ionicon'
                                size={30}
                                color='gray'
                            />
                        </TouchableOpacity>
                    </View>
                    {this._maybeRenderImage()}
                    <View>
                        <CustomDatePicker></CustomDatePicker>
                    </View>
                    <View>
                    <TextInput
                        borderBottomWidth={1}
                        underlineColorAndroid='transparent'
                        selectionColor={'#dd6401'}
                        placeholder='Task'
                        onChangeText={event => { this.setState({task: event}) }} value={this.state.task} ></TextInput>
                    </View>
                    <View style={{ backgroundColor: 'transparent', width: '100%', height: 80 }}></View>
                </View>
            );
        } else {
            return null;
        }

    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: "column",
        width: null,
        height: null,
        margin: 5
    },
    title: {
        fontSize: 20,
        color: "#333",
        marginBottom: 10
    },
    answersContainer: {
        flex: 1,
        flexDirection: "column",
    },
    viewButton: {
        marginTop: 5,
        marginBottom: 5
    },
    buttonContainer: {
        height: null,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        padding: 10,
        width: null,
        borderRadius: 3,
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowOffset: {
            height: 2,
            width: 2
        },
        elevation: 2
    },
    optionSelected: {
        backgroundColor: "#008000"
    },
    selected: {
        backgroundColor: "#000000"
    },
    exampleText: {
        fontSize: 20,
        marginBottom: 20,
        marginHorizontal: 15,
        textAlign: 'center',
    },
    maybeRenderUploading: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
    },
    maybeRenderContainer: {
        borderRadius: 3,
        elevation: 2,
        marginTop: 30,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: 0.2,
        shadowOffset: {
            height: 4,
            width: 4,
        },
        shadowRadius: 5,
        width: '100%',
    },
    maybeRenderImageContainer: {
        flexDirection: "row",
        justifyContent: 'space-around',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        overflow: 'hidden',
    },
    maybeRenderImage: {
        height: 50,
        width: 50,
        padding: 3
    },
    maybeRenderImageText: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    }

});
