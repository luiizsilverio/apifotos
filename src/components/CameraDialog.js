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

    function shot() {

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
    }    
})

export default CameraDialog