import { View, Text, Image } from 'react-native'
import React from 'react'

export default function EmptyList({message}) {
  return (
    <View className="flex justify-center items-center my-5">
      <Image className="w-36 h-36 drop-shadow mb-1" source={require('../assets/images/empty.png')} />
      <Text className="font-bold text-gray-400">{message || 'Data Not Found'}</Text>
    </View>
  )
}