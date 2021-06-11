import fs from 'react-native-fs'
import { Alert } from 'react-native'
import { NetworkService } from './NetworkService'

export const PictureService = {
    async save(filepath) {
        if(filepath.startsWith('http')) {
            filepath = await PictureService.saveRemote(filepath)
        }
        return filepath
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