import React, { useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Image, 
    Modal, 
    TouchableOpacity,
    Text, 
    Button 
} from 'react-native'

const camera = require('../images/camera.png')

function CameraDialog(props) {    
    const [currentImage, setCurrentImage] = useState('')

    const onClose = props.onClose ? props.onClose : () => {}
    const picture = currentImage ? {uri: currentImage} : camera
    
    function getImageFromClipboard() {

    }

    function shot() {

    }

    function save() {
        onClose()
    }

    return (
        <Modal
            visible={props.isOpen}
            animationType="fade"
            transparent={false}            
        >
            <View style={styles.modalView}>
                <View style={styles.previewContainer}>
                    <Image 
                        source={picture} 
                        style={styles.preview}
                    />
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.closeButton}>X</Text>
                    </TouchableOpacity>
                </View>

                <View>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Salvar"
                        onPress={save}
                        color="#0062ac"
                    />
                    <Button
                        title="Bater"
                        onPress={shot}
                        color="#0062ac"
                    />
                    <Button
                        title="Colar"
                        onPress={getImageFromClipboard}
                        color="#0062ac"
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1
    },
    previewContainer: {
        backgroundColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },  
    preview: {
        width: 100,
        height: 75,
        borderWidth: 2,
        borderColor: 'black'
    },
    closeButton: {
        padding: 15,
        backgroundColor: 'red',
        fontSize: 20,
        color: 'white'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 40,
        backgroundColor: 'gray'
    }    
})

export default CameraDialog