import React, { useState } from 'react';
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
          value={dishName}
          onChangeText={setDishName}
        />

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter food description..."
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Course:</Text>
        <View style={styles.pickerContainer}>
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
    backgroundColor: '#F5F7FA',
    paddingTop: 60,
  },
  screen: {
    flex: 1,
    paddingHorizontal: 20,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 5,
  },
  screenTitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  listContainer: {
    flex: 1,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#95A5A6',
    textAlign: 'center',
    marginTop: 60,
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
  menuItemCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dishNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E67E22',
  },
  descriptionText: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 25,
    backgroundColor: '#E67E22',
    width: 65,
    height: 65,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#E67E22',
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
    color: '#34495E',
    marginBottom: 6,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E6ED',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    color: '#2C3E50',
  },
  pickerContainer: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E6ED',
    borderRadius: 10,
    overflow: 'hidden',
  },
  saveButton: {
    backgroundColor: '#27AE60',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#95A5A6',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 40,
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
    backgroundColor: '#FDEDEC',
    padding: 10,
    borderRadius: 8,
  }
});
