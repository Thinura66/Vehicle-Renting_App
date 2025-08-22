import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Category {
  id: string;
  name: string;
  count: number;
}

interface CategoryButtonProps {
  category: Category;
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category, selectedCategory, onSelectCategory }) => {
  const isSelected = selectedCategory === category.id;

  return (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        isSelected && styles.selectedCategoryButton,
      ]}
      onPress={() => onSelectCategory(category.id)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          isSelected && styles.selectedCategoryButtonText,
        ]}
      >
        {category.name} ({category.count})
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryButton: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedCategoryButton: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  selectedCategoryButtonText: {
    color: 'white',
  },
});

export default CategoryButton;
