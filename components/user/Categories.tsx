import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import CategoryButton from './CategoryButton';

interface Category {
  id: string;
  name: string;
  count: number;
}

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <View style={styles.categoriesContainer}>
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            category={category}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
    color: '#1f2937',
  },
  categoriesScroll: {
    paddingHorizontal: 16,
  },
});

export default Categories;
