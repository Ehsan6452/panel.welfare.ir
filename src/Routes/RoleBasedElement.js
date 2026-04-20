import { useAuth } from '../Context/AuthContext';
import { ROLES } from '../Utilities/Roles';
import { sellerRoutesConfig } from './Seller/SellerRoutesConfig';
import { stateAdminRoutesConfig } from './StateAdmin/StateAdminRoutesConfig';
import { superAdminRoutesConfig } from './SuperAdmin/SuperAdminRoutesConfig';
import { Navigate } from 'react-router-dom';

export default function RoleBasedElement({ path }) {
  const { user } = useAuth();

  let config = [];
  if (user.role === ROLES.SELLER.name) config = sellerRoutesConfig;
  else if (user.role === ROLES.STATEADMIN.name) config = stateAdminRoutesConfig;
  else if (user.role === ROLES.SUPERADMIN.name) config = superAdminRoutesConfig;

  // --- تابع پیدا کردن مسیر
  const findRoute = (routes, parts) => {
    if (parts.length === 0) return null;
    const [first, ...rest] = parts;
    const cur = routes.find(r => r.path === first);
    if (!cur) return null;
    if (rest.length === 0) return cur;
    return findRoute(cur.subRoutes, rest);
  };

  const parts = path.split('/').filter(Boolean); // حذف خالی
  const route = findRoute(config, parts);

  if (!route) return <Navigate to="/dashboard" replace />;

  return route.element;
}