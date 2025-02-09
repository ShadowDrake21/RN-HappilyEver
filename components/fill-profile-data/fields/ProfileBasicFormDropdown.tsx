import CustomSelectDropdown from '@components/CustomSelectDropdown';
import React from 'react';
import { Controller } from 'react-hook-form';

import ProfileBasicFormError from '../ProfileBasicFormError';

import { genders } from '~/content/profile-basic-form.content';
import { ProfileBasicFormField } from '~/types/main-settings.types';
import { getFormRule } from '~/utils/forms.utils';

const ProfileBasicFormDropdown = ({ control, errors }: ProfileBasicFormField) => {
  return (
    <>
      <Controller
        control={control}
        rules={{
          required: getFormRule('required'),
        }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <CustomSelectDropdown
            data={genders}
            onSelect={(selectedItem) => onChange(selectedItem.title)}
            onBlur={onBlur}
            defaultValue={value}
            error={!!error}
          />
        )}
        name="gender"
      />
      {errors && <ProfileBasicFormError error={errors} style={{ marginHorizontal: 20 }} />}
    </>
  );
};

export default ProfileBasicFormDropdown;

//REFACTOR

// import React from 'react';
// import { StyleSheet } from 'react-native';
// import SelectDropdown, { SelectDropdownProps } from 'react-native-select-dropdown';

// import CustomSelectDropdownButton from './CustomSelectDropdownButton';
// import CustomSelectDropdownItem from './CustomSelectDropdownItem';

// import { SelectedFormItem } from '~/types/main-settings.types';

// type CustomSelectDropdownProps = {
//   data: any[];
//   onSelect: (selectedItem: any, index: number) => void;
//   error: boolean;
// } & Partial<SelectDropdownProps>;

// const CustomSelectDropdown = ({
//   data,
//   onSelect,
//   error,
//   ...dropdownProps
// }: CustomSelectDropdownProps) => {
//   return (
//     <SelectDropdown
//       {...dropdownProps}
//       onSelect={onSelect}
//       data={data}
//       renderButton={(selectedItem: SelectedFormItem, isOpened) => (
//         <CustomSelectDropdownButton selectedItem={selectedItem} isOpened={isOpened} error={error} />
//       )}
//       renderItem={(item: SelectedFormItem, _, isSelected) => (
//         <CustomSelectDropdownItem item={item} isSelected={isSelected} />
//       )}
//       showsVerticalScrollIndicator={false}
//       dropdownStyle={styles.dropdownMenuStyle}
//     />
//   );
// };

// export default CustomSelectDropdown;

// const styles = StyleSheet.create({
//   dropdownMenuStyle: {
//     backgroundColor: '#E9ECEF',
//     borderRadius: 8,
//     flex: 1,
//   },

//   dropdownButtonArrowStyle: {
//     fontSize: 28,
//   },
//   dropdownButtonIconStyle: {
//     fontSize: 28,
//     marginRight: 8,
//   },
// });
