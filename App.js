import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import {
	 StyleSheet,
	 Text,
	 View,
	 TextInput,
	 TouchableOpacity,
	 ScrollView,
	 Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
	 const colorScheme = useColorScheme();
	 const [currentScreen, setCurrentScreen] = useState('dashboard');
	 const [menuItems, setMenuItems] = useState([]);

	 const [dishName, setDishName] = useState('');
	 const [description, setDescription] = useState('');
	 const [course, setCourse] = useState('Starter');
	 const [price, setPrice] = useState('');

	 const [errorMessage, setErrorMessage] = useState('');

	 const handleSaveItem = () => {
			if (!dishName || !description || !course || !price) {
				 setErrorMessage('Please fill in all required fields to save the dish.');
				 return;
			}

			const newItem = {
				 id: Math.random().toString(),
				 dishName,
				 description,
				 course,
				 price
			};

			setMenuItems([...menuItems, newItem]);

			setDishName('');
			setDescription('');
			setCourse('Starter');
			setPrice('');
			setErrorMessage('');

			Alert.alert('Success', 'Menu item has been successfully added!');
			setCurrentScreen('dashboard');
	 };

	 const renderDashboard = () => (
			<View style={styles.screen}>
				 <Text style={styles.appTitle}>Chef's Menu Manager</Text>
				 <Text style={styles.screenTitle}>Dashboard Overview</Text>

				 <ScrollView style={styles.listContainer}>
						{/* Suitable message when no menu items have been added */}
						{menuItems.length === 0 ? (
							 <Text style={styles.emptyMessage}>No menu items have been added yet. Tap '+' to create one.</Text>
						) : (
							 menuItems.map(item => (
									<View key={item.id} style={styles.menuItemCard}>
										 <View style={styles.cardHeader}>
												<Text style={styles.dishNameText}>{item.dishName} ({item.course})</Text>
												<Text style={styles.priceText}>R {item.price}</Text>
										 </View>
										 <Text style={styles.descriptionText}>{item.description}</Text>
									</View>
							 ))
						)}
				 </ScrollView>

				 {/* Floating Action Button */}
				 <TouchableOpacity
						style={styles.floatingButton}
						onPress={() => setCurrentScreen('addForm')}
				 >
						<Text style={styles.floatingButtonText}>+</Text>
				 </TouchableOpacity>
			</View>
	 );

	 const renderAddForm = () => (
			<View style={styles.screen}>
				 <Text style={styles.appTitle}>Chef's Menu Manager</Text>
				 <Text style={styles.screenTitle}>Add New Menu Item</Text>

				 {/* Appropriate error messages */}
				 {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

				 <ScrollView style={styles.formContainer}>
						<Text style={styles.label}>Dish Name:</Text>
						<TextInput
							 style={styles.input}
							 placeholder="e.g. Spicy Lemon Wings"
							 placeholderTextColor="rgba(254,254,254,0.7)"
							 value={dishName}
							 onChangeText={setDishName}
						/>

						<Text style={styles.label}>Description:</Text>
						<TextInput
							 style={styles.input}
							 placeholder="Enter food description..."
							 placeholderTextColor="rgba(254,254,254,0.7)"
							 value={description}
							 onChangeText={setDescription}
							 multiline
						/>

						<Text style={styles.label}>Course:</Text>
						<View style={[styles.pickerContainer, {
							 backgroundColor: colorScheme === 'dark' ? 'rgb(4,9,47)' : 'rgb(4,9,47)' }]
							 }>
							 <Picker
									selectedValue={course}
									onValueChange={(itemValue) => setCourse(itemValue)}
							 >
									<Picker.Item label="Starter" value="Starter" />
									<Picker.Item label="Main" value="Main" />
									<Picker.Item label="Dessert" value="Dessert" />
							 </Picker>
						</View>

						<Text style={styles.label}>Price (R):</Text>
						<TextInput
							 style={styles.input}
							 placeholder="e.g. 120"
							 placeholderTextColor="rgba(254,254,254,0.7)"
							 value={price}
							 onChangeText={setPrice}
							 keyboardType="numeric"
						/>

						<TouchableOpacity style={styles.saveButton} onPress={handleSaveItem}>
							 <Text style={styles.saveButtonText}>Save Item</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.cancelButton} onPress={() => {
							 setCurrentScreen('dashboard');
							 setErrorMessage('');
						}}>
							 <Text style={styles.cancelButtonText}>Cancel</Text>
						</TouchableOpacity>
				 </ScrollView>
			</View>
	 );

	 return (
			<View style={styles.container}>
				 {currentScreen === 'dashboard' ? renderDashboard() : renderAddForm()}
			</View>
	 );
}

const styles = StyleSheet.create({
	 container: {
			flex: 1,
			backgroundColor: 'rgb(4,9,47)',
			paddingTop: 60,
	 },
	 screen: {
			flex: 1,
			paddingHorizontal: 20,
	 },
	 appTitle: {
			fontSize: 26,
			fontWeight: 'bold',
			color: '#FFFFFF',
			textAlign: 'center',
			marginBottom: 5,
			letterSpacing: 2, // Matches the spacing in the "DASHBOARD" mockup
	 },
	 screenTitle: {
			fontSize: 14,
			color: '#A0A0A0',
			textAlign: 'center',
			marginBottom: 20,
			textTransform: 'uppercase',
	 },
	 listContainer: {
			flex: 1,
	 },
	 emptyMessage: {
			fontSize: 16,
			color: '#888888',
			textAlign: 'center',
			marginTop: 60,
			fontStyle: 'italic',
			paddingHorizontal: 20,
	 },
	 menuItemCard: {
			backgroundColor: 'transparent',
			padding: 16,
			borderRadius: 4,
			marginBottom: 16,
			borderWidth: 1,
			borderColor: '#4A5A7B',
	 },
	 cardHeader: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginBottom: 8,
	 },
	 dishNameText: {
			fontSize: 16,
			color: '#FFFFFF',
			flex: 1,
	 },
	 priceText: {
			fontSize: 16,
			color: '#34db13',
	 },
	 descriptionText: {
			fontSize: 14,
			color: '#A0A0A0',
			lineHeight: 20,
	 },
	 floatingButton: {
			position: 'absolute',
			bottom: 30,
			right: 25,
			backgroundColor: '#2845E0',
			width: 65,
			height: 65,
			borderRadius: 35,
			justifyContent: 'center',
			alignItems: 'center',
			elevation: 5,
			shadowColor: '#2962FF',
			shadowOpacity: 0.4,
			shadowRadius: 6,
			shadowOffset: { width: 0, height: 3 },
	 },
	 floatingButtonText: {
			fontSize: 32,
			color: '#FFF',
			fontWeight: '300',
			marginTop: -2,
	 },
	 formContainer: {
			flex: 1,
	 },
	 label: {
			fontSize: 14,
			fontWeight: '700',
			color: '#FFFFFF',
			marginBottom: 6,
			marginTop: 15,
	 },
	 input: {
			backgroundColor: 'transparent',
			borderWidth: 1,
			borderColor: '#4A5A7B',
			padding: 14,
			borderRadius: 4,
			fontSize: 16,
			color: '#FFFFFF',
	 },
	 pickerContainer: {
			backgroundColor: '#E4E9F2',
			borderWidth: 1,
			borderColor: '#4A5A7B',
			borderRadius: 4,
			overflow: 'hidden',
	 },
	 saveButton: {
			backgroundColor: '#2845E0',
			padding: 16,
			borderRadius: 25, // Pill shape from the mockup
			alignItems: 'center',
			marginTop: 30,
	 },
	 saveButtonText: {
			color: '#FFFFFF',
			fontSize: 16,
			fontWeight: 'bold',
			letterSpacing: 1,
	 },
	 cancelButton: {
			backgroundColor: 'transparent',
			padding: 16,
			borderRadius: 25,
			alignItems: 'center',
			marginTop: 12,
			marginBottom: 40,
			borderWidth: 1,
			borderColor: '#4A5A7B',
	 },
	 cancelButtonText: {
			color: '#FFF',
			fontSize: 16,
			fontWeight: 'bold',
	 },
	 errorText: {
			color: '#FF4C4C',
			fontSize: 14,
			textAlign: 'center',
			marginBottom: 10,
			fontWeight: '600',
			backgroundColor: 'rgba(255, 76, 76, 0.1)',
			padding: 10,
			borderRadius: 8,
			borderWidth: 1,
			borderColor: '#FF4C4C',
	 }
});
