import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    View, 
    Image, 
    Modal, 
    TouchableOpacity,
    Text, 
    Button     
} from 'react-native'

import Clipboard from '@react-native-clipboard/clipboard'
import { PictureService } from '../services/PictureService'
import { RNCamera } from 'react-native-camera'

const camera = require('../images/camera.png')

function CameraDialog(props) {    
    const [currentImage, setCurrentImage] = useState('')

    const onClose = props.onClose ? props.onClose : () => {}
    const picture = currentImage ? {uri: currentImage} : camera    
    
    async function getImageFromClipboard() {
        const imageUrl = await Clipboard.getString()
        const extensions = ['.png', '.jpg', '.jpeg']
        const isImage = extensions.some(ext => (
            imageUrl.toLowerCase().includes(ext)
        ))
        
        if (isImage) {
            setCurrentImage(imageUrl)
        }
    }

    async function shot() {
        if (this.camera){
            const options = {quality: 0.5, base64: true}
            const data = await this.camera.takePictureAsync(options)

            setCurrentImage(data.uri)
        }
    }

    async function save() {
        const response = await PictureService.save(currentImage)
        //console.log('save', response)
        onClose(response)
    }

    useEffect(() => {
        
    }, [])

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
                    
                <View style={styles.cameraContainer}>
                    <RNCamera 
                        style={styles.camera} 
                        ref={ref => this.camera = ref}
                        type={RNCamera.Constants.Type.front}
                        flashMode={RNCamera.Constants.FlashMode.on}
                    />
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
        borderWidth: 2,
        borderColor: 'black',
        width: 80,
        height: 80
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
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    camera: {
        flex: 1,
        height: 250,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})

export default CameraDialog