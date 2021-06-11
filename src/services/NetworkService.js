import fs from 'react-native-fs'
import Share from "react-native-share"

export const NetworkService = {
  async share(filepath) {
    let opt = 'data:image/png;base64,'
    if (filepath.includes('.jp')) {
      opt = 'data:image/jpeg;base64,'
    }

    const file = opt + (await fs.readFile(filepath, 'base64'))

    const result = await Share.open({
      title: 'Compartilhar', 
      url: file
    })

    return result
  }
}