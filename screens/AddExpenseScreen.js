import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../theme'
import BackButton from '../components/backButton'
import { useNavigation } from '@react-navigation/native'
import { categories } from '../contansts'
import SnackBar from 'react-native-snackbar-component'
import { expensesRef } from '../config/firebase'
import { addDoc } from 'firebase/firestore'
import Loading from '../components/loading'

export default function AddExpenseScreen(props) {
  let { id } = props.route.params;
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSnackBar1, setShowSnackBar1] = useState(false);
  // const [errMessage, setErrMessage] = useState('');

  const handleAddExpense = async () => {
    if (title && amount && category) {
      // good to go
      // setTimeout(() => {
      //   navigation.goBack();
      // }, 500)
      setLoading(true);
      let doc = await addDoc(expensesRef, {
        title,
        amount,
        category,
        tripId: id
      });
      setLoading(false);
      if (doc && doc.id) {
        navigation.goBack();
      }
    } else {
      // show error
      setShowSnackBar1(true);
      setTimeout(() => {
        setShowSnackBar1(false);
      }, 2000);
    }
  }

  return (
    <SafeAreaView>
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="relative mt-5">
            <View className="absolute top-0 left-0 z-30">
              <BackButton />
            </View>
            <Text className={`${colors.heading} text-xl font-bold text-center`}>Add Expense</Text>
          </View>
          <View className="flex-row justify-center my-3 mt-5">
            <Image className="h-72 w-72" source={require('../assets/images/expenseBanner.png')} />
          </View>
          <View className="space-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>For What?</Text>
            <TextInput value={title} onChangeText={value => setTitle(value)} className="p-2 bg-white rounded-md mb-3" />
            <Text className={`${colors.heading} text-lg font-bold`}>How Much</Text>
            <TextInput value={amount} onChangeText={value => setAmount(value)} className="p-2 bg-white rounded-md mb-3" />
          </View>
          <View className="mx-2 space-y-2 mt-1">
            <Text className="text-lg font-bold">Category</Text>
            <View className="flex-row flex-wrap items-center">
              {
                categories.map(cat => {
                  let bgColor = 'bg-white';
                  if (cat.value == category) bgColor = 'bg-green-200'
                  return (
                    <TouchableOpacity onPress={() => setCategory(cat.value)} key={cat.value} className={`rounded-md ${bgColor} px-4 p-3 mb-2 mr-2`}>
                      <Text>{cat.title}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
        </View>
        <View>
          {
            loading ? (
              <Loading />
            ) : (
              <TouchableOpacity onPress={handleAddExpense} style={{backgroundColor: colors.button}} className="my-6 rounded-md p-4 shadow-lg mx-2">
                <Text className="text-center text-white text-lg font-bold">Add Expense</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </View>
      <SnackBar 
        visible={showSnackBar1} 
        textMessage="Please fill all the fields!" 
        backgroundColor="#d0342c"
      />
    </SafeAreaView>
  )
}