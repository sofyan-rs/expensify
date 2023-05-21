import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../theme'
import EmptyList from '../components/emptyList'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import BackButton from '../components/backButton'
import ExpenseCard from '../components/expenseCard'
import { expensesRef } from '../config/firebase'
import { getDocs, query, where } from 'firebase/firestore'
import { useEffect } from 'react'
import { useState } from 'react'

export default function TripExpensesScreen(props) {
  const navigation = useNavigation();

  const { id, place, country } = props.route.params;

  const [expenses, setExpenses] = useState([]);

  const isFocused = useIsFocused();

  const fetchExpenses = async () => {
    const q = query(expensesRef, where('tripId', '==', id));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, ' => ', doc.data());
      data.push({...doc.data(), id: doc.id});
    });
    setExpenses(data);
  }

  useEffect(() => {
    if (isFocused) {
      fetchExpenses();
    }
  }, [isFocused]);

  return (
    <SafeAreaView className="flex-1">
      <View className="px-4">
        <View className="relative mt-5">
          <View className="absolute top-0 left-0 z-30">
            <BackButton />
          </View>
          <Text className={`${colors.heading} text-xl font-bold text-center`}>{place}</Text>
          <Text className={`${colors.heading} text-xs text-center`}>{country}</Text>
        </View>
        <View className="flex-row justify-center items-center mb-4">
          <Image source={require('../assets/images/7.png')} className='w-60 h-60' />
        </View>
        <View className="space-y-4">
          <View className="flex-row justify-between items-center">
            <Text className={`${colors.heading} flex-1 font-bold text-xl`}>Expenses</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddExpense', {id, place, country})} className="py-2 px-3 bg-white border border-gray-200 rounded-md">
              <Text className={colors.heading}>Add Expense</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 460}}>
            <FlatList 
              data={expenses}
              ListEmptyComponent={<EmptyList message="You haven't recorded any expenses yet" />}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              className=""
              renderItem={({item}) => {
                return (
                  <ExpenseCard item={item} />
                )
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}