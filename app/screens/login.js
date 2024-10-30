import React, { useEffect, useState } from 'react';
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { images } from '../../constants';
import { CustomBtn } from '../../src/components';
import * as Font from "expo-font";

const { width, height } = Dimensions.get('window');

const Login = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Jua: require('../../src/assets/font/Jua-Regular.ttf'),
        Bold: require('../../src/assets/font/Gaegu-Bold.ttf'),
        Regular: require('../../src/assets/font/Gaegu-Regular.ttf'),
        Light: require('../../src/assets/font/Gaegu-Light.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts()
  }, []);

  if (!fontsLoaded) {
    return (
      <View></View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={images.login_image3}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.quoteText}>당신의 안전한 소셜 네트워킹 활동을 위하여 💪</Text>
        <Text style={styles.descriptionText}>
          Azure Protector가 안전하게 {"\n"} 지켜드릴게요. :)
        </Text>
      </View>
      <CustomBtn
        title="나의 개인정보 지키러 가기"
        textStyle={{ fontFamily: "Jua", fontSize: 24 }}
        buttonStyle={{ backgroundColor: '#4CAF50' }}
        onPress={() => router.push('screens/mainScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 40,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteText: {
    fontFamily: "Jua",
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  descriptionText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#555',
    fontFamily: "Bold",
  },
});

export default Login;