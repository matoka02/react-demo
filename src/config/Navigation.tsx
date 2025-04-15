import ContactsIcon from '@mui/icons-material/Contacts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import type { Navigation } from '@toolpad/core/AppProvider';

const NAVIGATION: Navigation = [
  { title: 'Dashboard', segment: 'dashboard', icon: <DashboardIcon /> },
  { title: 'Orders', segment: 'orders', icon: <ShoppingCartIcon /> },
  { title: 'Products', segment: 'products', icon: <Inventory2Icon /> },
  { title: 'Customers', segment: 'customers', icon: <ContactsIcon /> },
  { kind: 'header', title: 'Market & Sales' },
  { kind: 'divider' },
  { title: 'Blogs', segment: 'blogs', icon: <NewspaperIcon /> },
  { title: 'Agents', segment: 'agents', icon: <PeopleAltIcon /> },
];

export default NAVIGATION;
