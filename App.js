import React, { useState } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen'
import {
  StatusBar,
  StyleSheet,
  Button,
  useColorScheme,
  View,
} from 'react-native';

import PictureList from './src/components/PictureList'
import CameraDialog from './src/components/CameraDialog'

const samples = [  
    {id: '1', url: 'https://images-na.ssl-images-amazon.com/images/I/81A-ir0rTSL._RI_.jpg'},
    {id: '2', url: 'https://upload.wikimedia.org/wikipedia/pt/2/2d/Filme_Logan_2017.jpg'},
    {id: '3', url: 'https://upload.wikimedia.org/wikipedia/pt/thumb/a/af/Blade_Runner_2049.png/250px-Blade_Runner_2049.png'},
    {id: '4', url: 'https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Her.jpg/220px-Her.jpg'}
]

function App() {
  const [pictureList, setPictureList] = useState([...samples])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function onPictureSelect(item) {

  }

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal(response) {
    setIsModalOpen(false)
  }

  return (
    <View style={styles.container}>
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
    marginTop: 32,
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
  }
});

export default App;
