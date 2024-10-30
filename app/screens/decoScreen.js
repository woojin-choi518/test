import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { CustomBtn } from '../../src/components';

const DecoScreen = () => {
    const route = useRoute();
    const { selectedImage, result } = route.params;

    // 초기 상태로 selectedImage 설정
    const [selectedItems, setSelectedItems] = useState([]);
    const [displayedImage, setDisplayedImage] = useState(selectedImage);

    // result 문자열을 JSON 객체로 변환
    const parsedResult = JSON.parse(result);

    // 텍스트와 boundingPolygon 정보 추출
    const items = parsedResult.combined_result.map(item => ({
        text: item.text,
        boundingPolygon: item.boundingPolygon
    }));

    console.log("items: ", items)

    // 항목을 선택하거나 선택 해제하는 함수
    const toggleSelectItem = (item) => {
        const index = selectedItems.findIndex(i => i.text === item.text);
        if (index > -1) {
            setSelectedItems(selectedItems.filter(i => i.text !== item.text));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    // 서버로 선택된 항목을 전송하는 함수
    const sendSelectedItemsToServer = async () => {
        console.log("IN")
        try {
            const response = await fetch("http://100.66.163.31:8000/bluer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: selectedItems
                })
            });
            if (response.ok) {
                console.log("success1")
                const data = await response.json();
                if (data.blurred_image) {
                    setDisplayedImage(`data:image/png;base64,${data.blurred_image}`);
                }
                console.log("Success2")
            } else {
                console.log("Failed to send data");
            }
        } catch (error) {
            console.error("Error sending data to server:", error);
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>보호받고 싶은 부분을 {"\n"}선택해주세요 ✅</Text>
                <Text style={styles.subtitle}>
                    보호하고 싶은 부분을 멋지게 꾸며드릴게요.✨
                </Text>
            </View>

            {/* 선택된 이미지 표시 */}
            {displayedImage ? (
                <Image source={{ uri: displayedImage }} style={styles.image} />
            ) : (
                <Text style={styles.errorText}>이미지를 로드할 수 없습니다.</Text>
            )}

            {/* 텍스트 목록 표시 */}
            <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={() => toggleSelectItem(item)} 
                        style={[styles.textItem, selectedItems.find(i => i.text === item.text) && styles.selectedTextItem]}
                    >
                        <View style={[styles.checkbox, selectedItems.find(i => i.text === item.text) && styles.checkedCheckbox]} />
                        <Text style={styles.text}>{item.text}</Text>
                    </TouchableOpacity>
                )}
            />
                <CustomBtn
                    title=" 개인정보 가리기 "
                    onPress={sendSelectedItemsToServer}
                    textStyle={{ fontFamily: "Jua", fontSize: 24 }}
                    buttonStyle={{ backgroundColor: '#4CAF50', width: 200 }}
                />
                <CustomBtn
                    title=" 저장 "
                    textStyle={{ fontFamily: "Jua", fontSize: 24 }}
                    buttonStyle={{ backgroundColor: '#4CAF50', width: 200 }}
                />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    image: {
        width: "90%",
        height: 250,
        resizeMode: "contain",
        marginBottom: 20,
    },
    titleContainer: {
        width: '100%',
        paddingHorizontal: 25,
        marginBottom: 10,
    },
    listContainer: {
        paddingVertical: 10,
        width: '100%'
    },
    textItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: "#f9f9f9",
        width: '90%',
        alignSelf: 'center',
    },
    selectedTextItem: {
        backgroundColor: "#e0f7fa",
        borderColor: "#00897b",
    },
    checkbox: {
        width: 20,
        height: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
    },
    checkedCheckbox: {
        backgroundColor: "#4CAF50",
        borderColor: "#4CAF50",
    },
    text: {
        fontSize: 16,
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
    buttonContainer: {
        marginTop: 20,
        alignItems: "center",
        width: '100%',
    },
});

export default DecoScreen;
