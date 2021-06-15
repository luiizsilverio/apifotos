import fs from 'react-native-fs'
import { Alert } from 'react-native'
import { NetworkService } from './NetworkService'
//import CameraRoll from "@react-native-community/cameraroll"

export const PictureService = {
    async save(filepath) {
				if(filepath.startsWith('file:///')) {
					filepath = await PictureService.saveToCamera(filepath)
				
				} else if(filepath.startsWith('http')) {
            filepath = await PictureService.saveRemote(filepath)
						filepath = await PictureService.saveToCamera(filepath)
        }
        return filepath
    },

		async saveToCamera(filePath) {
			// salva a foto na galeria de fotos do celular
			// retorna o caminho onde salvou a foto ou vídeo
			//const url = await CameraRoll.saveToCameraRoll(filepath, 'photo') //'video'
			return url
		},

    async saveRemote(fromUrl){
        const extensions = ['.png', '.jpg', '.jpeg']
        const ext = extensions.find(ext => fromUrl.includes(ext)) || ''
        //const toFile = `${fs.DocumentDirectoryPath}/${Date.now()}${ext}`
        const toFile = `${fs.ExternalDirectoryPath}/${Date.now()}${ext}`

        result = await fs.downloadFile({
            fromUrl,
            toFile
        })
				await result.promise
				console.log(toFile)
        return 'file://' + toFile
    },

    selectPicture(item, onRemove) {
			Alert.alert(
				'Minha Imagem',
				null,
				[
					{
						text: 'Compartilhar',
						onPress: () => PictureService.onShare(item)
					},
					{
						text: 'Apagar',
						onPress: () => onRemove(item)
					},
					{
						text: 'Cancelar',
						style: 'cancel'
					}
				],
				{cancelable: false}
			)
    },

		async onShare (item) {
			const response = await NetworkService.share(item.url)
		}

}