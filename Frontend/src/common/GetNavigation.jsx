import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

export const GetNavigation = () => [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'organization',
        title: 'Organization',
        icon: <CorporateFareIcon />,
    },
    {
        segment: 'products',
        title: 'Products',
        icon: <CategoryIcon />,
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <AssessmentIcon />,
    },
    {
        kind: 'divider',
    },
    {
        segment: 'signin',
        title: 'Signin',
        icon: <LoginIcon />,
    },
    {
        segment: 'signup',
        title: 'Signup',
        icon: <AppRegistrationIcon />,
    },
]

