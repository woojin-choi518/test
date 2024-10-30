import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { CustomBtn } from '../../src/components';


const DecoScreen = () => {
    const route = useRoute();
    const { selectedImage } = route.params; // 이전 화면에서 넘어온 이미지 URI를 가져옴

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>보호받고 싶은 부분을 {"\n"}선택해주세요 ✅</Text>
                <Text style={styles.subtitle}>
                    보호하고 싶은 부분을 멋지게 꾸며드릴게요.✨
                </Text>
            </View>
        {/* 선택된 이미지 표시 */}
        {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
            <Text style={styles.errorText}>이미지를 로드할 수 없습니다.</Text>
        )}
      
        {/* 버튼 */}
            <CustomBtn
                title=" 개인정보 가리기 "
                textStyle={{ fontFamily: "Jua", fontSize: 24 }}
                buttonStyle={{ backgroundColor: '#4CAF50', width:200 }}
            />
            <CustomBtn
                title=" 저장 "
                textStyle={{ fontFamily: "Jua", fontSize: 24 }}
                buttonStyle={{ backgroundColor: '#4CAF50', width:200 }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    image: {
        width: "80%",
        height: "50%",
        resizeMode: "contain",
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
    },
    titleContainer: {
        width: '100%',
        paddingHorizontal: 25,
        marginBottom: 10,
    },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#ff0000",
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: "Jua",
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "500",
    color: "#555",
    fontFamily: "Jua",
    textAlign: 'left',
  },
});

export default DecoScreen;
