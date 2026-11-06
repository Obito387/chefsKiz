import React, { useState, useMemo } from 'react';
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

	 const [editingId, setEditingId] = useState(null);
	 const [dishName, setDishName] = useState('');
	 const [description, setDescription] = useState('');
	 const [course, setCourse] = useState('Starter');
	 const [price, setPrice] = useState('');

	 const [searchQuery, setSearchQuery] = useState('');
	 const [selectedFilter, setSelectedFilter] = useState('All');

	 const [errorMessage, setErrorMessage] = useState('');

	 const handleSaveItem = () => {
			if (!dishName.trim() || !description.trim() || !course || !price.trim()) {
				 setErrorMessage('Please fill in all required fields to save the dish.');
				 return;
			}

			const numericPrice = parseFloat(price);
			if (isNaN(numericPrice) || numericPrice <= 0) {
				 setErrorMessage('Please enter a valid price greater than 0.');
				 return;
			}

			const newItem = {
				 id: Math.random().toString(),
				 dishName: dishName.trim(),
				 description: description.trim(),
				 course,
				 price: numericPrice.toFixed(2)
			};

			setMenuItems([...menuItems, newItem]);
			resetForm();
			Alert.alert('Success', 'Menu item has been successfully added!');
			setCurrentScreen('dashboard');
	 };

	 const handleEditPress = (item) => {
			setEditingId(item.id);
			setDishName(item.dishName);
			setDescription(item.description);
			setCourse(item.course);
			setPrice(item.price.toString());
			setErrorMessage('');
			setCurrentScreen('editForm');
	 };

	 const handleUpdateItem = () => {
			if (!dishName.trim() || !description.trim() || !course || !price.trim()) {
				 setErrorMessage('Please fill in all required fields to save the dish.');
				 return;
			}

			const numericPrice = parseFloat(price);
			if (isNaN(numericPrice) || numericPrice <= 0) {
				 setErrorMessage('Please enter a valid price greater than 0.');
				 return;
			}

			setMenuItems(prevItems =>
				 prevItems.map(item =>
						item.id === editingId
							 ? {
									...item,
									dishName: dishName.trim(),
									description: description.trim(),
									course,
									price: numericPrice.toFixed(2)
							 }
							 : item
				 )
			);

			resetForm();
			Alert.alert('Updated', 'Menu item has been successfully updated!');
			setCurrentScreen('dashboard');
	 };

	 const handleDeleteItem = (id, name) => {
			Alert.alert(
				 'Delete Item',
				 `Are you sure you want to remove "${name}" from the menu?`,
				 [
						{ text: 'Cancel', style: 'cancel' },
						{
							 text: 'Delete',
							 style: 'destructive',
							 onPress: () => {
									setMenuItems(prevItems => prevItems.filter(item => item.id !== id));
							 }
						}
				 ]
			);
	 };

	 const resetForm = () => {
			setEditingId(null);
			setDishName('');
			setDescription('');
			setCourse('Starter');
			setPrice('');
			setErrorMessage('');
	 };

	 const filteredMenuItems = useMemo(() => {
			return menuItems.filter(item => {
				 const matchesSearch = item.dishName.toLowerCase().includes(searchQuery.toLowerCase());
				 const matchesFilter = selectedFilter === 'All' || item.course === selectedFilter;
				 return matchesSearch && matchesFilter;
			});
	 }, [menuItems, searchQuery, selectedFilter]);

	 const stats = useMemo(() => {
			const total = menuItems.length;
			const totalSum = menuItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
			const average = total > 0 ? (totalSum / total).toFixed(2) : '0.00';

			const courseCounts = { Starter: 0, Main: 0, Dessert: 0 };
			menuItems.forEach(item => {
				 if (courseCounts[item.course] !== undefined) {
						courseCounts[item.course]++;
				 }
			});

			return { total, average, courseCounts };
	 }, [menuItems]);

	 const renderDashboard = () => (
			<View style={styles.screen}>
				 <Text style={styles.appTitle}>Chef's Menu Manager</Text>
				 <Text style={styles.screenTitle}>Dashboard Overview</Text>

				 {/* STATISTICS MODULE */}
				 <View style={styles.statsCard}>
						<Text style={styles.statsHeader}>Menu Statistics</Text>
						<View style={styles.statsRow}>
							 <View style={styles.statCol}>
									<Text style={styles.statNumber}>{stats.total}</Text>
									<Text style={styles.statLabel}>Total Items</Text>
							 </View>
							 <View style={[styles.statCol, styles.statDivider]}>
									<Text style={styles.statNumber}>R {stats.average}</Text>
									<Text style={styles.statLabel}>Avg Price</Text>
							 </View>
							 <View style={[styles.statCol, styles.statDivider]}>
									<Text style={styles.statNumber}>
										 S: {stats.courseCounts.Starter} | M: {stats.courseCounts.Main} | D: {stats.courseCounts.Dessert}
									</Text>
									<Text style={styles.statLabel}>Courses (S|M|D)</Text>
							 </View>
						</View>
				 </View>

				 <View style={styles.searchFilterContainer}>
						<TextInput
							 style={styles.searchInput}
							 placeholder="Search by name..."
							 placeholderTextColor="rgba(255, 255, 255, 0.5)"
							 value={searchQuery}
							 onChangeText={setSearchQuery}
						/>
						
						<View style={styles.filterPickerWrapper}>
							 <Picker
									selectedValue={selectedFilter}
									onValueChange={(itemValue) => setSelectedFilter(itemValue)}
									style={styles.filterPicker}
									dropdownIconColor="#FFFFFF"
							 >
									<Picker.Item label="All Courses" value="All" />
									<Picker.Item label="Starter" value="Starter" />
									<Picker.Item label="Main" value="Main" />
									<Picker.Item label="Dessert" value="Dessert" />
							 </Picker>
						</View>
				 </View>

				 <ScrollView 
				 	style={styles.listContainer}
				 	contentContainerStyle={styles.scrollContent}
				 >
						{filteredMenuItems.length === 0 ? (
							 <View style={styles.emptyContainer}>
									<Text style={styles.emptyMessage}>
										{menuItems.length === 0
											 ? "No menu items have been added yet.\n\nTap the '+' button below to create one."
											 : "No matching menu items found. Adjust your filters."}
									</Text>
							 </View>
						) : (
							 filteredMenuItems.map(item => (
									<View key={item.id} style={styles.menuItemCard}>
										 <View style={styles.cardHeader}>
												<Text style={styles.dishNameText}>{item.dishName} ({item.course})</Text>
												<Text style={styles.priceText}>R {item.price}</Text>
										 </View>
										 <Text style={styles.descriptionText}>{item.description}</Text>
										 
										 {/* EDIT & DELETE OPERATIONS */}
										 <View style={styles.cardActions}>
												<TouchableOpacity
													 style={styles.editButton}
													 onPress={() => handleEditPress(item)}
												>
													 <Text style={styles.actionButtonText}>Edit</Text>
												</TouchableOpacity>
												<TouchableOpacity
													 style={styles.deleteButton}
													 onPress={() => handleDeleteItem(item.id, item.dishName)}
												>
													 <Text style={styles.actionButtonText}>Delete</Text>
												</TouchableOpacity>
										 </View>
									</View>
							 ))
						)}
				 </ScrollView>

				 <TouchableOpacity
						style={styles.floatingButton}
						onPress={() => {
							 resetForm();
							 setCurrentScreen('addForm');
						}}
				 >
						<Text style={styles.floatingButtonText}>+</Text>
				 </TouchableOpacity>
			</View>
	 );

	 const renderForm = (isEditMode) => (
			<View style={styles.screen}>
				 <Text style={styles.appTitle}>Chef's Menu Manager</Text>
				 <Text style={styles.screenTitle}>{isEditMode ? 'Edit Menu Item' : 'Add New Menu Item'}</Text>

				 {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

				 <ScrollView 
				 	style={styles.formContainer}
				 	contentContainerStyle={styles.scrollContent}
				 >
						<Text style={styles.label}>Dish Name:</Text>
						<TextInput
							 style={styles.input}
							 placeholder="e.g. Spicy Lemon Wings"
							 placeholderTextColor="rgba(255, 255, 255, 0.4)"
							 value={dishName}
							 onChangeText={setDishName}
						/>

						<Text style={styles.label}>Description:</Text>
						<TextInput
							 style={styles.input}
							 placeholder="Enter food description..."
							 placeholderTextColor="rgba(255, 255, 255, 0.4)"
							 value={description}
							 onChangeText={setDescription}
							 multiline
						/>

						<Text style={styles.label}>Course:</Text>
						<View style={styles.pickerContainer}>
							 <Picker
									selectedValue={course}
									onValueChange={(itemValue) => setCourse(itemValue)}
									dropdownIconColor="#FFFFFF"
									style={styles.formPicker}
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
							 placeholderTextColor="rgba(255, 255, 255, 0.4)"
							 value={price}
							 onChangeText={setPrice}
							 keyboardType="numeric"
						/>

						<TouchableOpacity
							 style={styles.saveButton}
							 onPress={isEditMode ? handleUpdateItem : handleSaveItem}
						>
							 <Text style={styles.saveButtonText}>{isEditMode ? 'Save Changes' : 'Save Item'}</Text>
						</TouchableOpacity>

						<TouchableOpacity
							 style={styles.cancelButton}
							 onPress={() => {
									setCurrentScreen('dashboard');
									resetForm();
							 }}
						>
							 <Text style={styles.cancelButtonText}>Cancel</Text>
						</TouchableOpacity>
				 </ScrollView>
			</View>
	 );

	 return (
			<View style={styles.container}>
				 {currentScreen === 'dashboard'
						? renderDashboard()
						: renderForm(currentScreen === 'editForm')}
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
			letterSpacing: 2,
	 },
	 screenTitle: {
			fontSize: 14,
			color: '#A0A0A0',
			textAlign: 'center',
			marginBottom: 15,
			textTransform: 'uppercase',
	 },
	 statsCard: {
			backgroundColor: 'rgba(74, 90, 123, 0.25)',
			borderWidth: 1,
			borderColor: '#4A5A7B',
			borderRadius: 8,
			padding: 12,
			marginBottom: 15,
	 },
	 statsHeader: {
			color: '#FFFFFF',
			fontSize: 15,
			fontWeight: 'bold',
			textAlign: 'center',
			marginBottom: 8,
			textTransform: 'uppercase',
			letterSpacing: 1,
	 },
	 statsRow: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
	 },
	 statCol: {
			flex: 1,
			alignItems: 'center',
	 },
	 statDivider: {
			borderLeftWidth: 1,
			borderLeftColor: '#4A5A7B',
	 },
	 statNumber: {
			color: '#FFFFFF',
			fontSize: 13,
			fontWeight: 'bold',
			marginBottom: 2,
	 },
	 statLabel: {
			color: '#A0A0A0',
			fontSize: 10,
			textTransform: 'uppercase',
	 },
	 searchFilterContainer: {
			flexDirection: 'row',
			gap: 10,
			marginBottom: 15,
	 },
	 searchInput: {
			flex: 1,
			backgroundColor: 'transparent',
			borderWidth: 1,
			borderColor: '#4A5A7B',
			padding: 10,
			borderRadius: 8,
			fontSize: 15,
			color: '#FFFFFF',
	 },
	 filterPickerWrapper: {
			width: 140,
			borderWidth: 1,
			borderColor: '#4A5A7B',
			borderRadius: 8,
			backgroundColor: 'rgba(74, 90, 123, 0.25)',
	  	justifyContent: 'center',
	 },
	 filterPicker: {
			color: '#FFFFFF',
			height: 40,
	 },
	 listContainer: {
			flex: 1,
	 },
	 scrollContent: {
			paddingBottom: 100,
			flexGrow: 1,
	 },
	 emptyContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			paddingBottom: 60,
	 },
	 emptyMessage: {
			fontSize: 16,
			color: '#888888',
			textAlign: 'center',
			fontStyle: 'italic',
			paddingHorizontal: 20,
			lineHeight: 24,
	 },
	 menuItemCard: {
			backgroundColor: 'rgba(74, 90, 123, 0.1)',
			padding: 16,
			borderRadius: 8,
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
			fontWeight: 'bold',
	 },
	 priceText: {
			fontSize: 16,
			color: '#34db13',
			fontWeight: 'bold',
	 },
	 descriptionText: {
			fontSize: 14,
			color: '#A0A0A0',
			lineHeight: 20,
	 },
	 cardActions: {
			flexDirection: 'row',
			justifyContent: 'flex-end',
			gap: 12,
			marginTop: 12,
			paddingTop: 12,
			borderTopWidth: 1,
			borderTopColor: 'rgba(74, 90, 123, 0.3)',
	 },
	 editButton: {
			backgroundColor: '#2845E0',
			paddingVertical: 6,
			paddingHorizontal: 16,
			borderRadius: 15,
	 },
	 deleteButton: {
			backgroundColor: '#d32f2f',
			paddingVertical: 6,
			paddingHorizontal: 16,
			borderRadius: 15,
	 },
	 actionButtonText: {
			color: '#FFFFFF',
			fontSize: 12,
			fontWeight: 'bold',
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
			borderRadius: 8,
			fontSize: 16,
			color: '#FFFFFF',
	 },
	 pickerContainer: {
			backgroundColor: 'rgba(74, 90, 123, 0.25)',
			borderWidth: 1,
			borderColor: '#4A5A7B',
			borderRadius: 8,
			overflow: 'hidden',
	 },
	 formPicker: {
			color: '#FFFFFF',
	 },
	 saveButton: {
			backgroundColor: '#2845E0',
			padding: 16,
			borderRadius: 25,
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
