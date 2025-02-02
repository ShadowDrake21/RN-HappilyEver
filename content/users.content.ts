import { IMainSettingsBasicForm } from '~/types/main-settings.types';
import { IUserProfile } from '~/types/user.types';

export const mock_users: IUserProfile[] = [
  {
    fullName: 'Emily Johnson',
    username: 'emily_j',
    gender: 'Female',
    birthDate: new Date(2001, 6, 12),
    phoneNumber: '+1234567890',
    countryId: 'PL',
    occupation: 'Graphic Designer',
    profileUrl: 'https://i.pinimg.com/736x/0d/48/da/0d48dab8bb202a0594a3621149457cd8.jpg',
  },
  {
    fullName: 'Sophia Martinez',
    username: 'sophia_m',
    gender: 'Female',
    birthDate: new Date(2006, 2, 24), // March 24, 1998
    phoneNumber: '+1987654321',
    countryId: 'US',
    profileUrl: 'https://i.pinimg.com/736x/12/4d/52/124d522e99598ebab12830548752f0ff.jpg',
    occupation: 'Marketing Specialist',
  },
  {
    fullName: 'Olivia Williams',
    username: 'olivia_w',
    gender: 'Female',
    birthDate: new Date(1999, 9, 5), // October 5, 1993
    phoneNumber: '+1122334455',
    countryId: 'GB',
    occupation: 'Software Engineer',
    profileUrl: 'https://i.pinimg.com/736x/18/d4/66/18d466fe95be59d2f6b8c7499b395f56.jpg',
  },
  {
    fullName: 'Emma Brown',
    username: 'emma_b',
    gender: 'Female',
    birthDate: new Date(2000, 4, 18), // May 18, 2000
    phoneNumber: '+1555666777',
    countryId: 'DE',
    occupation: 'Teacher',
    profileUrl: 'https://i.pinimg.com/736x/26/7e/f1/267ef15d3024c65e01a5cb9d9cdc172e.jpg',
  },
  {
    fullName: 'Isabella Davis',
    username: 'isabella_d',
    gender: 'Female',
    birthDate: new Date(1996, 11, 30), // December 30, 1996
    phoneNumber: '+1444555666',
    countryId: 'FR',
    occupation: 'Nurse',
    profileUrl: 'https://i.pinimg.com/736x/62/d0/03/62d003e115866aa311b0afbe076b62c0.jpg',
  },
  {
    fullName: 'Mia Anderson',
    username: 'mia_a',
    gender: 'Female',
    birthDate: new Date(2005, 7, 14), // August 14, 1997
    phoneNumber: '+1777888999',
    countryId: 'ES',
    occupation: 'Photographer',
    profileUrl: 'https://i.pinimg.com/736x/2f/d8/2c/2fd82ce9bc1158363c219da88fb2adf5.jpg',
  },
  {
    fullName: 'Ava Thompson',
    username: 'ava_t',
    gender: 'Female',
    birthDate: new Date(1999, 3, 21), // April 21, 1999
    phoneNumber: '+1333444555',
    countryId: 'IT',
    occupation: 'Journalist',
    profileUrl: 'https://i.pinimg.com/736x/5a/ac/c3/5aacc396a82613c9bb422a0d683a3287.jpg',
  },
  {
    fullName: 'Charlotte White',
    username: 'charlotte_w',
    gender: 'Female',
    birthDate: new Date(1997, 10, 8), // November 8, 1994
    phoneNumber: '+1222333444',
    countryId: 'RU',
    occupation: 'Psychologist',
    profileUrl: 'https://i.pinimg.com/736x/1e/eb/63/1eeb6385d073c6d4246d361e983c5ff7.jpg',
  },
  {
    fullName: 'Amelia Harris',
    username: 'amelia_h',
    gender: 'Female',
    birthDate: new Date(2001, 1, 25), // February 25, 2001
    phoneNumber: '+1999888777',
    countryId: 'JP',
    occupation: 'Fashion Designer',
    profileUrl: 'https://i.pinimg.com/736x/93/c8/39/93c8391da28158d061a340b3a3f16672.jpg',
  },
  {
    fullName: 'Lily Scott',
    username: 'lily_s',
    gender: 'Female',
    birthDate: new Date(1996, 5, 10), // June 10, 1992
    phoneNumber: '+1888999666',
    countryId: 'CN',
    occupation: 'Doctor',
    profileUrl: 'https://i.pinimg.com/736x/cf/7f/af/cf7faf35edccd8e12e9db8a0140f7a6c.jpg',
  },
];
