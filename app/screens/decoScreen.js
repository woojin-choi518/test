import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";

const DecoScreen = () => {
  const route = useRoute();
  const { selectedImage } = route.params; // 이전 화면에서 넘어온 이미지 URI를 가져옴

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* 선택된 이미지 표시 */}
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      ) : (
        <Text style={styles.errorText}>이미지를 로드할 수 없습니다.</Text>
      )}
      
      {/* 버튼 */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>개인정보 가리기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>저장</Text>
        </TouchableOpacity>
      </View>
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
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
});

export default DecoScreen;
