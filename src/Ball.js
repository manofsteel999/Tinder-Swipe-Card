import React, { useRef } from "react";
import {
	View,
	StyleSheet,
	SafeAreaView,
	Text,
	Animated,
	Button,
} from "react-native";

const Ball = () => {
	const position = useRef(new Animated.ValueXY(0, 0)).current;
	const ballMove = () => {
		Animated.spring(position, {
			toValue: { x: 200, y: 500 },
			speed: 5,
		}).start();
	};

	return (
		<View>
			<Animated.View style={position.getLayout()}>
				<View style={styles.ball} />
			</Animated.View>
			<Button title="Press" onPress={ballMove} />
		</View>
	);
};

const styles = StyleSheet.create({
	ball: {
		height: 60,
		width: 60,
		borderRadius: 30,
		borderWidth: 30,
		borderColor: "black",
		margin: 40,
	},
});

export default Ball;
