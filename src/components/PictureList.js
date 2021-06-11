import React, { useState } from 'react'
import { 
    View, 
    Image, 
    FlatList, 
    TouchableHighlight,
    StyleSheet,
    useWindowDimensions    
} from 'react-native'

function PictureList(props) {
    const list = props.list ? props.list : []
    const on_Click = props.onClick ? props.onClick : () => {}
    
    return (
        <View style={styles.container}>
            <FlatList
                numColumns={3}
                data={list}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <PictureListItem
                        onClick={on_Click}
                        item={item}
                    />                    
                )}                
            />
        </View>
    )
}

function PictureListItem(props) {
    const {item} = props
    const largura = useWindowDimensions().width / 3 - 8  
    
    return (
        <TouchableHighlight
            onPress={() => props.onClick(item)}
        >
            <Image
                source={{uri: item.url}}
                style={[styles.image, {width: largura, height: largura}]}
            />
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        margin: 2        
    }
})

export default PictureList
