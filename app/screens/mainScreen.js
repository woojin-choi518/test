import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { CustomBtn } from '../../src/components';
import { useRouter } from 'expo-router';

const MainScreen = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [result, setResult] = useState()
    const [content, setContent] = useState()
    const [imageBase64, setImageBase64] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    // 갤러리 접근 & 사진 선택
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
        alert("Permission to access gallery is required!");
        return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
            base64: true
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setImageBase64(result.assets[0].base64);  
        }
    };

     // 서버로 이미지 전송 (Base64 인코딩된 이미지)
    const uploadImage = async () => {
      if (!imageBase64) return;

      try {
          const response = await fetch("http://100.66.163.31:8000/upload", {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ image: imageBase64 }),
          });

          if (response.ok) {
              const data = await response.json();  
              setResult(data.combined_result)
              setContent(data.combined_result.content)
              console.log("Image uploaded successfully");
          } else {
              console.log("Image upload failed", response.status);
          }
      } catch (error) {
          console.error("Error uploading image:", error);
      }
  };
  
  
    // "다음" 버튼 클릭 시 이미지 전송 및 다음 화면 이동
    const nextStep = async() => {
      if (step === 1 && selectedImage) {
          setStep(2);
          await uploadImage()
      } else if (step === 2) {
          setStep(3);
      }
  };

    // 이미지 전달
    const goToDecoScreen = () => {
        router.push({
          pathname: 'screens/decoScreen',
          params: { selectedImage, result: JSON.stringify(result) }
        });
    };

  const renderContent = () => {
    return (
      <>
        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
        {step === 1 && (
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.highlightedText}>   갤러리에서 선택</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.highlightedText}>사진 찍기   </Text>
            </TouchableOpacity>
          </View>
        )}
        {step === 3 && (
          <Text style={styles.feedback}>{content}</Text>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.stepsContainer}>
        {[1, 2, 3].map((num) => (
          <View key={num} style={[styles.stepCircle, step >= num && styles.activeStep]}>
            <Text style={styles.stepNumber}>{num}</Text>
          </View>
        ))}
      </View>

      {/* Title and Subtitle always below the step indicators */}
      <View style={styles.titleContainer}>
        {step === 1 && (
          <>
            <Text style={styles.title}>보호받고 싶은 이미지를 {"\n"}업로드해주세요 🏃‍♂️</Text>
            <Text style={styles.subtitle}>
              사진과 비디오를 업로드 하기 전에 개인정보를 안전하게 보호해드릴게요.
            </Text>
          </>
        )}
        {step === 2 && <Text style={styles.title}>사진 분석 중...</Text>}
        {step === 3 && <Text style={styles.title}>분석 완료 🎉</Text>}
      </View>

      <View style={styles.contentContainer}>{renderContent()}</View>
      
      <View style={[styles.buttonRow, stepStyle(step)]}>
        {step > 1 && (
          <CustomBtn
            title="이전"
            textStyle={{ fontFamily: "Jua", fontSize: 24 }}
            buttonStyle={{ backgroundColor: '#4CAF50', width:100 }}
            onPress={() => setStep(step - 1)}
          />
        )}
        {(selectedImage || step > 1) && step < 3 && (
          <CustomBtn
            title="다음"
            textStyle={{ fontFamily: "Jua", fontSize: 24 }}
            buttonStyle={{ backgroundColor: '#4CAF50', width:100 }}
            onPress={nextStep}
          />
        )}
        {step === 3 && (
          <CustomBtn
            title="다음"
            textStyle={{ fontFamily: "Jua", fontSize: 24 }}
            buttonStyle={{ backgroundColor: '#4CAF50', width:100 }}
            onPress={goToDecoScreen}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const stepStyle = (step) => {
  switch (step) {
    case 2:
    case 3:
      return { justifyContent: 'space-between' };
    default:
      return { justifyContent: 'flex-end' };
  }
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    paddingLeft: 20,
    marginVertical: 20,
  },
  titleContainer: {
    width: '100%',
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeStep: {
    backgroundColor: '#4CAF50',
  },
  stepNumber: {
    color: '#fff',
    fontWeight: 'bold',
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
  highlightedText: {
    fontFamily: "Jua",
    color: "#1490FB",
    fontSize: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
    justifyContent: "space-between",
    paddingHorizontal:30,
  },
  image: {
    width: '80%',
    height: '40%',
    resizeMode: 'contain',
    marginVertical: 10,
    flex: 1
  },
  feedback: {
    fontSize: 18,
    marginBottom: 100,
    fontWeight: "500",
    color: "#555",
    fontFamily: "Jua",
    padding:20
  },
});

export default MainScreen;
