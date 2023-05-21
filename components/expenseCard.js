import { View, Text } from 'react-native'
import React from 'react'
import { categoryBG, colors } from '../theme'

export default function ExpenseCard({ item }) {
  return (
    <View style={{backgroundColor: categoryBG[item.category]}} className="flex-row justify-between items-center p-3 px-5 mb-3 rounded-md">
      <View>
        <Text className={`${colors.heading} font-bold text-base`}>{item.title}</Text>
        <Text className={`${colors.heading} text-sm`}>{item.category}</Text>
      </View>
      <View>
        <Text className="text-base">${item.amount}</Text>
      </View>
    </View>
  )
}