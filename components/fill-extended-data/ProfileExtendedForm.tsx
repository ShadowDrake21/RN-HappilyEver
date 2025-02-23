import React from 'react';

import ProfileExtendedFormGroup from './ProfileExtendedFormGroup';

import {
  familyFutureContent,
  lifeGoalsContent,
  loveRelationshipsContent,
  personalConnectionContent,
} from '~/content/profile-extended-form.content';
import useProfileExtendedForm from '~/hooks/forms/useProfileExtendedForm';

const ProfileExtendedForm = () => {
  const { control, errors } = useProfileExtendedForm();

  return (
    <>
      <ProfileExtendedFormGroup
        control={control}
        errors={errors}
        fields={lifeGoalsContent}
        mainTitle="Life Goals"
      />
      <ProfileExtendedFormGroup
        control={control}
        errors={errors}
        fields={loveRelationshipsContent}
        mainTitle="Love & Relationships"
      />
      <ProfileExtendedFormGroup
        control={control}
        errors={errors}
        fields={familyFutureContent}
        mainTitle="Family & Future"
      />
      <ProfileExtendedFormGroup
        control={control}
        errors={errors}
        fields={personalConnectionContent}
        mainTitle="Personal Connection"
      />
    </>
  );
};

export default ProfileExtendedForm;
