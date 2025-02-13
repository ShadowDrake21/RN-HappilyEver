import { IUserFullProfile, IUserProfile } from '~/types/user.types';

export const mock_users: IUserProfile[] = [
  {
    user_id: 'user_34Ody2eBkmTxsSreCCvycC1Njxs',
    id: '01d58ac7-7fce-4a38-8900-481a9de0081f',
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
    user_id: 'user_2sfgy2eBkmTxsSreCCvycC1Njxs',
    id: '0411cb6b-8171-4132-949f-278a1b474314',
    fullName: 'Sophia Martinez',
    username: 'sophia_m',
    gender: 'Female',
    birthDate: new Date(2006, 2, 24),
    phoneNumber: '+1987654321',
    countryId: 'US',
    profileUrl: 'https://i.pinimg.com/736x/12/4d/52/124d522e99598ebab12830548752f0ff.jpg',
    occupation: 'Marketing Specialist',
  },
  {
    user_id: 'user_3fghy2eBkmTxsSreCCvycC1Njxs',
    id: '0be7b553-b897-4c9f-93bc-46b822f16742',
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
    user_id: 'user_4jklm2eBkmTxsSreCCvycC1Njxs',
    id: '01d58ac7-7fce-4a38-8900-481a9de0081f',
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
    user_id: 'user_5vbnm2eBkmTxsSreCCvycC1Njxs',
    id: '0411cb6b-8171-4132-949f-278a1b474314',
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
    user_id: 'user_6cxza2eBkmTxsSreCCvycC1Njxs',
    id: '0be7b553-b897-4c9f-93bc-46b822f16742',
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
    user_id: 'user_7qwer2eBkmTxsSreCCvycC1Njxs',
    id: '01d58ac7-7fce-4a38-8900-481a9de0081f',
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
    user_id: 'user_8nmjk2eBkmTxsSreCCvycC1Njxs',
    id: '0411cb6b-8171-4132-949f-278a1b474314',
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
    user_id: 'user_9asdf2eBkmTxsSreCCvycC1Njxs',
    id: '0be7b553-b897-4c9f-93bc-46b822f16742',
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
    user_id: 'user_10zxcv2eBkmTxsSreCCvycC1Njxs',
    id: '01d58ac7-7fce-4a38-8900-481a9de0081f',
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

export const mock_full_users: IUserFullProfile[] = [
  {
    id: '01d58ac7-7fce-4a38-8900-481a9de0081f',
    profileUrl: 'https://i.pinimg.com/736x/2e/16/83/2e16833cba6d2c33c6af98e08b983307.jpg',
    countryId: 'PL',
    profileBasicForm: {
      fullName: 'Emma Johnson',
      username: 'emma_love',
      gender: 'Female',
      birthDate: new Date('2001-06-15'),
      phoneNumber: '+1234567890',
      occupation: 'Graphic Designer',
    },
    profileExtendedForm: [
      {
        category: 'lifeGoals',
        question: 'lifeGoals.goals',
        answer: 'Build a successful design business and travel the world.',
      },
      {
        category: 'lifeGoals',
        question: 'lifeGoals.idealLifestyle',
        answer: 'A balanced mix of creativity, adventure, and family moments.',
      },
      {
        category: 'loveRelationships',
        question: 'loveRelationships.relationshipType',
        answer: 'Looking for a serious relationship leading to marriage.',
      },
      {
        category: 'loveRelationships',
        question: 'loveRelationships.valuesInPartner',
        answer: 'Loyalty, kindness, ambition, and humor.',
      },
      {
        category: 'loveRelationships',
        question: 'loveRelationships.dealBreakers',
        answer: 'Dishonesty, lack of ambition, and bad communication.',
      },

      {
        category: 'familyFuture',
        question: 'familyFuture.marriagePerspective',
        answer: 'Believe in marriage as a lifelong commitment.',
      },
      {
        category: 'familyFuture',
        question: 'familyFuture.childrenInFuture',
        answer: 'Would love 2-3 kids in the future.',
      },
      {
        category: 'familyFuture',
        question: 'familyFuture.familyLife',
        answer: 'A warm and loving home with shared responsibilities.',
      },
      {
        category: 'personalConnection',
        question: 'personalConnection.sharedInterests',
        answer: 'Art, photography, hiking, and cooking.',
      },
      {
        category: 'personalConnection',
        question: 'personalConnection.emotionalConnection',
        answer: 'Open and honest communication is key to a healthy relationship.',
      },
    ],
    photos: [
      {
        name: 'profile_pic_1',
        url: 'https://i.pinimg.com/736x/5f/df/80/5fdf80b34e5ef8dd3ff83c4e32a9f25b.jpg',
      },
      {
        name: 'profile_pic_2',
        url: 'https://i.pinimg.com/736x/10/df/97/10df9745a05572f6030b44a8d9bacfb3.jpg',
      },
      {
        name: 'profile_pic_3',
        url: 'https://i.pinimg.com/736x/f3/3b/f8/f33bf8c32430849cf9cc9c830874480b.jpg',
      },
      {
        name: 'profile_pic_4',
        url: 'https://i.pinimg.com/736x/d7/b7/4b/d7b74bbb622d51cb132138a677bc36da.jpg',
      },
    ],
    interests: [
      {
        categoryId: 'ac',
        interestIds: ['ac1'],
      },
      {
        categoryId: 'fl',
        interestIds: ['fl1', 'fl2'],
      },
      {
        categoryId: 'tt',
        interestIds: ['tt6', 'tt3', 'tt1', 'tt2'],
      },
    ],
    idealMatch: 'relationship',
  },
  {
    id: '0411cb6b-8171-4132-949f-278a1b474314',
    profileUrl: 'https://i.pinimg.com/736x/ab/fc/c1/abfcc139308606e74f1a280f1d1d6f01.jpg',
    countryId: 'HU',
    profileBasicForm: {
      fullName: 'Sophia Williams',
      username: 'sophia_heart',
      gender: 'Female',
      birthDate: new Date('1999-11-28'),
      phoneNumber: '+447700900123',
      occupation: 'Software Engineer',
    },
    profileExtendedForm: [
      {
        category: 'lifeGoals',
        question: 'lifeGoals.goals',
        answer: 'Excel in my tech career and find a supportive life partner.',
      },
      {
        category: 'lifeGoals',
        question: 'lifeGoals.idealLifestyle',
        answer: 'A mix of tech, family life, and occasional travel.',
      },
      {
        category: 'loveRelationships',
        question: 'loveRelationships.relationshipType',
        answer: 'Seeking a committed relationship with someone serious about the future.',
      },
      {
        category: 'loveRelationships',
        question: 'loveRelationships.valuesInPartner',
        answer: 'Respect, intelligence, humor, and emotional availability.',
      },
      {
        category: 'loveRelationships',
        question: 'loveRelationships.dealBreakers',
        answer: 'Lack of ambition, dishonesty, and excessive partying.',
      },
      {
        category: 'familyFuture',
        question: 'familyFuture.marriagePerspective',
        answer: 'Marriage is important but should come naturally.',
      },
      {
        category: 'familyFuture',
        question: 'familyFuture.childrenInFuture',
        answer: 'Open to having children but not in a rush.',
      },
      {
        category: 'familyFuture',
        question: 'familyFuture.familyLife',
        answer: 'A stable home where both partners support each other’s dreams.',
      },
      {
        category: 'personalConnection',
        question: 'personalConnection.sharedInterests',
        answer: 'Tech, reading, gaming, and fitness.',
      },
      {
        category: 'personalConnection',
        question: 'personalConnection.emotionalConnection',
        answer: 'Deep conversations and emotional support are essential.',
      },
    ],
    photos: [
      {
        name: 'profile_pic_1',
        url: 'https://i.pinimg.com/736x/fa/a2/3c/faa23ce0909b86f7dd94300e5c3935e4.jpg',
      },
      {
        name: 'profile_pic_2',
        url: 'https://i.pinimg.com/736x/4e/56/86/4e56865ad7c1c5f6e21f7b9acf73e845.jpg',
      },
      {
        name: 'profile_pic_3',
        url: 'https://i.pinimg.com/736x/d9/89/5e/d9895e4a5041b0015734e43c20e8371f.jpg',
      },
      {
        name: 'profile_pic_4',
        url: 'https://i.pinimg.com/736x/84/33/fa/8433fa71d372f813a0b94509211c741e.jpg',
      },
    ],
    interests: [
      {
        categoryId: 'ac',
        interestIds: ['ac1'],
      },
      {
        categoryId: 'fl',
        interestIds: ['fl1', 'fl2'],
      },
      {
        categoryId: 'tt',
        interestIds: ['tt6', 'tt3', 'tt1', 'tt2'],
      },
    ],
    idealMatch: 'marriage',
  },
  {
    id: '0be7b553-b897-4c9f-93bc-46b822f16742',
    profileUrl: 'https://i.pinimg.com/736x/7e/3e/12/7e3e127af21ba1de0fd106d3c1d6a221.jpg',
    countryId: 'CA',
    profileBasicForm: {
      fullName: 'Olivia Martinez',
      username: 'olivia_dreamer',
      gender: 'Female',
      birthDate: new Date('1998-03-22'),
      phoneNumber: '+15145551234',
      occupation: 'Psychologist',
    },
    profileExtendedForm: [
      {
        category: 'lifeGoals',
        question: 'lifeGoals.goals',
        answer: 'Help people improve their mental health and have a fulfilling family life.',
      },
      {
        category: 'lifeGoals',
        question: 'lifeGoals.idealLifestyle',
        answer: 'A peaceful life filled with love, self-care, and meaningful relationships.',
      },
      {
        category: 'loveRelationships',
        question: 'loveRelationships.relationshipType',
        answer: 'Looking for a supportive and loving relationship.',
      },
      {
        category: 'loveRelationships',
        question: 'loveRelationships.valuesInPartner',
        answer: 'Empathy, patience, and strong communication skills.',
      },
      {
        category: 'loveRelationships',
        question: 'loveRelationships.dealBreakers',
        answer: 'Toxic behavior, manipulation, and lack of responsibility.',
      },
      {
        category: 'familyFuture',
        question: 'familyFuture.marriagePerspective',
        answer: 'Marriage is a beautiful commitment when both partners are ready.',
      },
      {
        category: 'familyFuture',
        question: 'familyFuture.childrenInFuture',
        answer: 'Definitely want children and a big, loving family.',
      },
      {
        category: 'familyFuture',
        question: 'familyFuture.familyLife',
        answer: 'A nurturing home where love and mutual respect thrive.',
      },
      {
        category: 'personalConnection',
        question: 'personalConnection.sharedInterests',
        answer: 'Psychology, meditation, nature walks, and volunteering.',
      },
      {
        category: 'personalConnection',
        question: 'personalConnection.emotionalConnection',
        answer: 'Deep emotional connection and trust are my top priorities.',
      },
    ],

    photos: [
      {
        name: 'profile_pic_1',
        url: 'https://i.pinimg.com/736x/51/f3/12/51f312867f6ca71cdb353a3c1908f661.jpg',
      },
      {
        name: 'profile_pic_2',
        url: 'https://i.pinimg.com/736x/bf/ba/78/bfba78fb5cc87dbc5f7c0438cf83d856.jpg',
      },
      {
        name: 'profile_pic_3',
        url: 'https://i.pinimg.com/736x/a2/dd/7a/a2dd7aa9cb6f56ef3b6c41d3d5c1770a.jpg',
      },
      {
        name: 'profile_pic_4',
        url: 'https://i.pinimg.com/736x/cb/44/66/cb4466defd7ae21f727f70db8d4e8276.jpg',
      },
    ],
    interests: [
      {
        categoryId: 'ac',
        interestIds: ['ac1'],
      },
      {
        categoryId: 'fl',
        interestIds: ['fl1', 'fl2'],
      },
      {
        categoryId: 'tt',
        interestIds: ['tt6', 'tt3', 'tt1', 'tt2'],
      },
    ],
    idealMatch: 'companionship',
  },
];
