import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Layout = () => {
  return (
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false, // 기본적으로 헤더를 보이게 설정
          }}>
          <Stack.Screen 
            name="screens/login" 
            options={{ 
              title: '로그인',
              headerShown: false, // 로그인 화면에서는 헤더 숨기기
            }} 
          />
          <Stack.Screen name="screens/mainScreen" options={{ title: 'main Screen'}} />
          <Stack.Screen name="screens/decoScreen" options={{ title: 'decoScreen'}} />
        </Stack>
      </SafeAreaProvider>
  )
}

export default Layout;
