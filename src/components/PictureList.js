import React, { useState } from 'react'
import { 
    View, 
    Image, 
    FlatList, 
    TouchableHighlight,
    StyleSheet
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
    
    return (
        <TouchableHighlight
            onPress={() => props.onClick(item)}
        >
            <Image
                source={{uri: item.url}}
                style={styles.image}
            />
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: 80,
        height: 80
        
    }
})

export default PictureList
