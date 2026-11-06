# ChefsKiz Manager

## Overview
This is a React Native mobile application developed for the MAST5112 Portfolio of Evidence (Final Submission).
The application provides a digital platform that allows kitchen staff and chefs to easily organize, update, manage, 
and analyze their daily menu offerings directly from their phones, replacing disorganized paper systems.

## Change Log (Updates Since Part 2)
**The following features were added to complete the application requirements:**

**Manage Menu Items:**
Added functionality to edit existing menu item information and delete menu items directly from the dashboard. Changes are reflected immediately upon saving.

**Search and Filter:**
Implemented a search bar to find menu items by name, and a dropdown filter to view items by specific courses (Starter, Main, Dessert, or All).   Menu Statistics: Added a real-time statistics dashboard that displays the total number of menu items, the average price of all items, and the total count of items available in each course.   Refactoring and Code EnhancementsDuring the transition from Part 2 to the Final PoE, the following refactoring and quality improvements were made to the codebase:Layout and UI Fixes: Refactored the ScrollView using contentContainerStyle to prevent the menu list from overlapping with the floating action button. Improved the visual contrast of the picker and cards using semi-transparent backgrounds to create a more consistent and professional look.   Enhanced Validation: Upgraded the price validation logic to ensure inputs are strictly numeric and greater than zero, providing meaningful error messages if the user enters invalid data.   State Optimization: Implemented React's useMemo hook to calculate statistics and handle search/filter arrays dynamically. This reduced repeated code and ensured the app remains highly performant when rendering the list.   Current FeaturesMenu Dashboard: A primary list view that automatically updates to display all current menu items.Add & Edit Item Screens: Dedicated data entry screens to capture new dishes or modify existing ones.Data Capture: Records the Dish Name, Description, Course (using a dropdown picker for Starter, Main, or Dessert), and Price.Search & Filter: Quickly locate specific dishes by name or category.Live Analytics: Instantly view menu totals, averages, and course distributions.Input Validation: Ensures no required fields are left blank and restricts the price field to realistic numeric input.User Feedback: Displays custom error messages for incomplete forms and provides success/deletion confirmation alerts.

## Current Features
**Menu Dashboard:** A primary list view that automatically updates to display all current menu items.

**Add & Edit Item Screens:** Dedicated data entry screens to capture new dishes or modify existing ones.

**Data Capture:** Records the Dish Name, Description, Course (using a dropdown picker for Starter, Main, or Dessert), and Price.

**Search & Filter:** Quickly locate specific dishes by name or category.

**Live Analytics:** Instantly view menu totals, averages, and course distributions.

**Input Validation:** Ensures no required fields are left blank and restricts the price field to realistic numeric input.

**User Feedback:** Displays custom error messages for incomplete forms and provides success/deletion confirmation alerts.

## Technologies Used
- React Native
- Expo
- @react-native-picker/picker

## Installation and Setup
To run this project locally, ensure you have Node.js installed, then follow these steps in your terminal:

 Clone this repository to your local machine.

 Navigate into the project directory and install the required dependencies:

```Bash
npm install
```

 Start the Expo development server:

```Bash
npx expo start -c
```

 Scan the generated QR code using the Expo Go app on your iOS or Android device to view the application.

# Video Demonstration
https://youtube.com/shorts/nF3m9rdiPjg?si=OrRa3b7fal9d1qBd
