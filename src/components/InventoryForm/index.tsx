import React, {FC} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Formik} from 'formik';
import {inventoryItemSchema} from '../../utils/validation';
import {InventoryItem} from '../../types';

interface InventoryFormProps {
  initialValues: Partial<InventoryItem>;
  onSubmit: (values: Partial<InventoryItem>) => Promise<void>;
  submitButtonText: string;
  existingItems: InventoryItem[];
}

export const InventoryForm: FC<InventoryFormProps> = ({
  initialValues,
  onSubmit,
  submitButtonText,
  existingItems,
}) => {
  const validationSchema = inventoryItemSchema(existingItems);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount={true}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <ScrollView style={styles.container}>
          <View style={styles.fieldContainer}>
            <TextInput
              style={[
                styles.input,
                touched.name && errors.name && styles.inputError,
              ]}
              placeholder="Item Name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
            />
            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}
          </View>

          <View style={styles.fieldContainer}>
            <TextInput
              style={[
                styles.input,
                touched.totalStock && errors.totalStock && styles.inputError,
              ]}
              placeholder="Total Stock"
              value={values.totalStock?.toString()}
              onChangeText={handleChange('totalStock')}
              onBlur={handleBlur('totalStock')}
              keyboardType="numeric"
            />
            {touched.totalStock && errors.totalStock && (
              <Text style={styles.errorText}>{errors.totalStock}</Text>
            )}
          </View>

          <View style={styles.fieldContainer}>
            <TextInput
              style={[
                styles.input,
                touched.price && errors.price && styles.inputError,
              ]}
              placeholder="Price"
              value={values.price?.toString()}
              onChangeText={handleChange('price')}
              onBlur={handleBlur('price')}
              keyboardType="decimal-pad"
            />
            {touched.price && errors.price && (
              <Text style={styles.errorText}>{errors.price}</Text>
            )}
          </View>

          <View style={styles.fieldContainer}>
            <TextInput
              style={[
                styles.input,
                styles.multiline,
                touched.description && errors.description && styles.inputError,
              ]}
              placeholder="Description (minimum 3 words)"
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              multiline
              numberOfLines={4}
            />
            {touched.description && errors.description && (
              <Text style={styles.errorText}>{errors.description}</Text>
            )}
          </View>

          <Button
            title={submitButtonText}
            onPress={() => handleSubmit()}
            disabled={!isValid}
          />
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  inputError: {
    borderColor: 'red',
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  deleteButtonContainer: {
    marginTop: 16,
  },
});
