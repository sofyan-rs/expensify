import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../theme'
import BackButton from '../components/backButton'
import { useNavigation } from '@react-navigation/native'
import SnackBar from 'react-native-snackbar-component'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { setUserLoading } from '../redux/slices/user'
import Loading from '../components/loading'
import { useDispatch, useSelector } from 'react-redux'

export default function SignUpScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSnackBar1, setShowSnackBar1] = useState(false);
  const [showSnackBar2, setShowSnackBar2] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const { userLoading } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (email && password) {
      // good to go
      try {
        dispatch(setUserLoading(true));
        await createUserWithEmailAndPassword(auth, email, password);
        dispatch(setUserLoading(false));
      } catch (error) {
        dispatch(setUserLoading(false));
        setErrMessage(error.message);
        setShowSnackBar2(true);
        setTimeout(() => {
          setShowSnackBar2(false);
        }, 2000);
      }
      
      // setTimeout(() => {
      //   navigation.navigate('Home');
      // }, 500)
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
            <Text className={`${colors.heading} text-xl font-bold text-center`}>Sign Up</Text>
          </View>
          <View className="flex-row justify-center my-3 mt-5">
            <Image className="h-80 w-80" source={require('../assets/images/signup.png')} />
          </View>
          <View className="space-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
            <TextInput value={email} onChangeText={value => setEmail(value)} className="p-2 bg-white rounded-md mb-3" />
            <Text className={`${colors.heading} text-lg font-bold`}>Password</Text>
            <TextInput value={password} secureTextEntry onChangeText={value => setPassword(value)} className="p-2 bg-white rounded-md mb-3" />
          </View>
        </View>
        <View>
          {
            userLoading ? (
              <Loading />
            ) : (
              <TouchableOpacity onPress={handleSubmit} style={{backgroundColor: colors.button}} className="my-6 rounded-md p-4 shadow-lg mx-2">
                <Text className="text-center text-white text-lg font-bold">Sign Up</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </View>
      <SnackBar 
        visible={showSnackBar1} 
        textMessage="Username and Password are required!" 
        backgroundColor="#d0342c"
      />
      <SnackBar 
        visible={showSnackBar2} 
        textMessage={errMessage}
        backgroundColor="#d0342c"
      />
    </SafeAreaView>
  )
}