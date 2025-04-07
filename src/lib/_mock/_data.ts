/* eslint-disable camelcase */
import {
  mock_id,
  mock_price,
  mock_times,
  mock_company,
  mock_fullName,
  mock_taskNames,
  mock_postTitles,
  mock_description,
  mock_productNames,
  mock_orderId,
  mock_location,
  mock_email,
  mock_mobile,
  mock_roles,
  mock_promoCode,
  mock_address,
} from './_mock';

// ----------------------------------------------------------------------

export const mock_myAccount = {
  displayName: 'Harry Potter',
  email: 'harrypotter@test.com',
  photoURL: '/assets/images/avatar/avatar-25.webp',
};

// ----------------------------------------------------------------------

export const mock_agents = [...Array(24)].map((_, index) => {
  const fullname = mock_fullName(index);
  const location = mock_location(index);
  return {
    id: mock_id(index),
    name: fullname,
    firstName: fullname.split(' ')[0],
    lastName: fullname.split(' ')[1],
    company: mock_company(index),
    mobile: mock_mobile(index),
    email: mock_email(index),
    city: location.split(',')[0],
    state: location.split(',')[1],
    isVerified: true,
    avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
    status: index % 8 ? 'active' : 'locked',
    role: mock_roles[index] || 'Sales Agent',
  };
});

export const roleArray = (): Array<{ id: string; title: string }> => [
  { id: '1', title: 'Sales Leader' },
  { id: '2', title: 'Hr Manager' },
  { id: '3', title: 'Sales Agent' },
  { id: '4', title: 'Sales Operator' },
  { id: '5', title: 'Sales Manager' },
  { id: '6', title: 'Project Manager' },
  { id: '7', title: 'Business Analyst' },
  { id: '9', title: 'Product Designer' },
  { id: '10', title: 'Market Manager' },
  { id: '11', title: 'General Manager' },
];

// ----------------------------------------------------------------------
export const mock_customers = [...Array(12)].map((_, index) => {
  const fullname = mock_fullName(20 - index);
  const location = mock_location(20 - index);
  return {
    id: mock_id(index),
    name: fullname,
    // company: mock_company(index),
    firstName: fullname.split(' ')[0],
    lastName: fullname.split(' ')[1],
    email: mock_email(index),
    mobile: mock_mobile(index),
    phone: mock_mobile(12 - index),
    // shippingAddress: mock_location(20-index),
    // billingAddress: mock_location(20-index),
    city: location.split(',')[0],
    state: location.split(',')[1],
    country: location.split(',')[2],
    hasItemInShoppingCart: index % 4 === 0,
    avatarUrl: `/assets/images/customer/avatar-${index + 1}.png`,
    membership: index % 4 ? 'vip' : 'standard',
  };
});

// ----------------------------------------------------------------------

export const mock_posts = [...Array(26)].map((_, index) => ({
  id: mock_id(index),
  title: mock_postTitles(index),
  description: mock_description(index),
  coverUrl: `/assets/images/cover/cover-${index + 1}.webp`,
  totalViews: 8829,
  totalComments: 7977,
  totalShares: 8556,
  totalFavorites: 8870,
  postedAt: mock_times(index),
  author: {
    name: mock_fullName(index),
    avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
  },
}));

// ----------------------------------------------------------------------

const COLORS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

export const mock_products = [...Array(31)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: mock_id(index),
    price: mock_price(index),
    name: mock_productNames(index),
    priceSale: setIndex % 3 ? null : mock_price(index),
    coverUrl: `/assets/images/product/product-${setIndex}.webp`,
    colors:
      (setIndex === 1 && COLORS.slice(0, 2)) ||
      (setIndex === 2 && COLORS.slice(1, 3)) ||
      (setIndex === 3 && COLORS.slice(2, 4)) ||
      (setIndex === 4 && COLORS.slice(3, 6)) ||
      (setIndex === 23 && COLORS.slice(4, 6)) ||
      (setIndex === 24 && COLORS.slice(5, 6)) ||
      COLORS,
    status:
      ([1, 3, 5, 10, 30].includes(setIndex) && 'sale') ||
      ([4, 8, 12, 15, 17, 18, 20, 22, 28].includes(setIndex) && 'new') ||
      '',
    category: '',
  };
});

export const mock_orders = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;
  const address = mock_address();
  // `${mock_streetData(
  //   index)} ${mock_location(26 - index)}`
  return {
    id: mock_id(index),
    orderId: mock_orderId(index),
    totalPrice: mock_price(index) || mock_price(index - 10),
    itemSummary: mock_productNames(index),
    discount: setIndex % 3 ? setIndex : 0,
    promoteCode: setIndex % 3 === 0 ? mock_promoCode() : '',
    shippingAddress: address,
    billingAddress: address,
    customer: mock_fullName(index),

    // colors:
    //   (setIndex === 1 && COLORS.slice(0, 2)) ||
    //   (setIndex === 2 && COLORS.slice(1, 3)) ||
    //   (setIndex === 3 && COLORS.slice(2, 4)) ||
    //   (setIndex === 4 && COLORS.slice(3, 6)) ||
    //   (setIndex === 23 && COLORS.slice(4, 6)) ||
    //   (setIndex === 24 && COLORS.slice(5, 6)) ||
    //   COLORS,
    isDelayed: index % 3 === 0,
    status:
      ([1, 3, 5].includes(setIndex) && 'packing') ||
      ([2, 11, 14, 16, 21, 23].includes(setIndex) && 'shipping') ||
      ([4, 8, 12].includes(setIndex) && 'delivered') ||
      'customs-clearance',
  };
});

// ----------------------------------------------------------------------

export const mock_langs = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/flags/ic-flag-en.svg',
  },
  {
    value: 'de',
    label: 'German',
    icon: '/assets/icons/flags/ic-flag-de.svg',
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/assets/icons/flags/ic-flag-fr.svg',
  },
];

// ----------------------------------------------------------------------

export const mock_timeline = [...Array(5)].map((_, index) => ({
  id: mock_id(index),
  title: [
    '1983, orders, $4220',
    '12 Invoices have been paid',
    'Order #37745 from September',
    'New order placed #XF-2356',
    'New order placed #XF-2346',
  ][index],
  type: `order${index + 1}`,
  time: mock_times(index),
}));

// ----------------------------------------------------------------------

export const mock_tasks = [...Array(5)].map((_, index) => ({
  id: mock_id(index),
  name: mock_taskNames(index),
}));

// ----------------------------------------------------------------------

export const mock_notifications = [
  {
    id: mock_id(1),
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatarUrl: null,
    type: 'order-placed',
    postedAt: mock_times(1),
    isUnRead: true,
  },
  {
    id: mock_id(2),
    title: mock_fullName(2),
    description: 'answered to your comment on the Minimal',
    avatarUrl: '/assets/images/avatar/avatar-2.webp',
    type: 'friend-interactive',
    postedAt: mock_times(2),
    isUnRead: true,
  },
  {
    id: mock_id(3),
    title: 'You have new message',
    description: '5 unread messages',
    avatarUrl: null,
    type: 'chat-message',
    postedAt: mock_times(3),
    isUnRead: false,
  },
  {
    id: mock_id(4),
    title: 'You have new mail',
    description: 'sent from Guido Padberg',
    avatarUrl: null,
    type: 'mail',
    postedAt: mock_times(4),
    isUnRead: false,
  },
  {
    id: mock_id(5),
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatarUrl: null,
    type: 'order-shipped',
    postedAt: mock_times(5),
    isUnRead: false,
  },
];
// function mock_address(): any {
//   throw new Error('Function not implemented.');
// }

// function mock_streetData(arg0: number) {
//   throw new Error('Function not implemented.');
// }

/* eslint-enable camelcase */
