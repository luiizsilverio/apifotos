import React, { useState, useEffect } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen'
import {
  StatusBar,
  StyleSheet,
  Button,
  useColorScheme,
  View,
  Text  
} from 'react-native';

import PictureList from './src/components/PictureList'
import CameraDialog from './src/components/CameraDialog'
import { StorageService } from './src/services/StorageService'
import { PictureService } from './src/services/PictureService';

const samples = [  
    {id: '1', url: 'https://images-na.ssl-images-amazon.com/images/I/81A-ir0rTSL._RI_.jpg'},
    {id: '2', url: 'https://upload.wikimedia.org/wikipedia/pt/2/2d/Filme_Logan_2017.jpg'},
    {id: '3', url: 'https://upload.wikimedia.org/wikipedia/pt/thumb/a/af/Blade_Runner_2049.png/250px-Blade_Runner_2049.png'},
    {id: '4', url: 'https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Her.jpg/220px-Her.jpg'}
]

function App() {
  const [pictureList, setPictureList] = useState([]) //[...samples])
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function onPictureSelect(item) {
    PictureService.selectPicture(item, onRemove)
  }

  async function onRemove (item) {
    const lista = pictureList.filter(listItem => listItem.id !== item.id)

    await StorageService.set('picturelist', lista)
    setPictureList(lista)
  }

  function openModal() {
    setIsModalOpen(true)
  }

  async function closeModal(response) {
    setIsModalOpen(false)

    if (typeof response === 'string') {
      const newItem = {url: response, id: (Date.now()).toString()}
      const lista = [...pictureList, newItem]
      
      await StorageService.set('pictureList')
      setPictureList([...lista])
    }
  }

  useEffect(() => {
    async function getList() {
      let lista = await StorageService.get('pictureList')
      if (!lista || lista.length == 0) {
        await StorageService.set('pictureList', samples)
        lista = await StorageService.get('pictureList') || []
      }    
      setPictureList(lista)      
    }

    getList()
  }, [])
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galeria de Fotos</Text>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <PictureList 
        list={pictureList} 
        onClick={onPictureSelect}
      />

      <View style={styles.footer}>
        <Button
          onPress={openModal}
          title="Nova Foto"
          color="#0062ac"
        />
      </View>

      <CameraDialog isOpen={isModalOpen} onClose={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff'
  },
  footer: {
    padding: 15,
    backgroundColor: '#999',
    width: '100%',
    textAlign: 'center'
  },
  title: {
    width: '100%',
    fontWeight: 'bold', 
    color: 'indigo',
    backgroundColor: 'burlywood',
    textAlign: 'center',
    fontSize: 18
  } 
});

export default App;
