import React, { useRef, useState, useEffect } from "react";
import { Card, Button } from "react-native-elements";
import {
	View,
	StyleSheet,
	Text,
	FlatList,
	Animated,
	PanResponder,
	Dimensions,
	LogBox,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.6 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const Deck = (props) => {
	const [index, setIndex] = useState(1);

	// Code snippet to hide that useNAtiveDriver error message
	useEffect(() => {
		LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
	}, []);

	const getCardStyle = () => {
		const rotate = position.x.interpolate({
			inputRange: [-SCREEN_WIDTH * 2.0, 0, SCREEN_WIDTH * 2.0],
			outputRange: ["-120deg", "0deg", "120deg"],
		});

		return {
			...position.getLayout(),
			transform: [{ rotate: rotate }],
		};
	};

	const renderCard = ({ item }) => {
		// console.log("Item is " + item.id);
		console.log("Index state is " + index);
		if (index >= props.data.length) {
			return props.renderNoMoreCards;
		}
		if (item.id < index) {
			return null;
		}

		if (item.id == index) {
			// when we are currently on the card to be shown on the screen adn still not swiped right or left and attaching all the animations to that card
			// added if block so that only 1st card can be gesture controlled for swipe functionality otherwise flatlist as a whole was getting moved away on gesture
			return (
				<Animated.View
					style={getCardStyle()}
					{...panResponder.panHandlers}
				>
					<Card>
						<Card.Title>{item.text}</Card.Title>
						<Card.Image source={{ uri: item.uri }}></Card.Image>
						<Text style={{ marginBottom: 10, marginTop: 10 }}>
							I can customize this card further
						</Text>
						<Button
							icon={{ name: "code" }}
							backgroundColor="#03A9F4"
							title="View Now!"
						/>
					</Card>
				</Animated.View>
			);
		}

		return (
			<Animated.View style={[styles.cardStyle, { top: 10 * item.id }]}>
				<Card>
					<Card.Title>{item.text}</Card.Title>
					<Card.Image source={{ uri: item.uri }}></Card.Image>
					<Text style={{ marginBottom: 10, marginTop: 10 }}>
						I can customize this card further
					</Text>
					<Button
						icon={{ name: "code" }}
						backgroundColor="#03A9F4"
						title="View Now!"
					/>
				</Card>
			</Animated.View>
		);
	};

	const position = useRef(new Animated.ValueXY()).current;

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (event, gestureState) => {
				// console.log(gestureState);
				position.setValue({ x: gestureState.dx, y: gestureState.dy });
			},
			onPanResponderRelease: (event, gestureState) => {
				if (gestureState.dx > SWIPE_THRESHOLD) {
					console.log("Swiped Right");
					forceSwipe("right");
				} else if (gestureState.dx < -SWIPE_THRESHOLD) {
					console.log("Swiped Left");
					forceSwipe("left");
				} else {
					resetPosition();
				}
			},
		})
	).current;

	// Helper function to move the card out of the display smoothly on swiping right
	const forceSwipe = (direction) => {
		const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
		Animated.timing(position, {
			toValue: { x, y: 0 },
			duration: SWIPE_OUT_DURATION,
		}).start(() => onSwipeComplete(direction));
	};

	const onSwipeComplete = (direction) => {
		// destructure props for onSwipeLeft and onSwipeRight here
		// const item = props.data[index];
		// direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
		position.setValue({ x: 0, y: 0 });
		setIndex((currentIndex) => currentIndex + 1);
	};
	// Func. to reset the card to its default position if its not swiped left/right
	const resetPosition = () => {
		Animated.spring(position, {
			toValue: { x: 0, y: 0 },
			speed: 5,
		}).start();
	};
	return (
		<View style={styles.container}>
			<FlatList
				data={props.data}
				keyExtractor={(card) => card.id.toString()}
				inverted={true}
				renderItem={renderCard}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		//	margin: 40,
		marginTop: 30,
		//	flex: 1,
	},
	cardStyle: {
		position: "absolute",
		width: SCREEN_WIDTH,
	},
});

export default Deck;
