// import { useNavigate } from 'react-router-dom';
// import { useAdmin } from '../../context/AdminContext';
// // import { FaTable, FaUserShield } from 'react-icons/fa'; // npm install react-icons

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { isAdmin, logout } = useAdmin();

//   return (
//     <nav className="navbar">
//       <div className="nav-logo" onClick={() => navigate('/')}>
//         <img src="/assets/images/logo.png" alt="Athletico" />
//       </div>
//       <div className="nav-actions">
//         <button onClick={() => navigate('/players')} title="View Players">
//           <FaTable />
//         </button>
//         {isAdmin ? (
//           <button onClick={logout} className="btn-login">Logout</button>
//         ) : (
//           <button onClick={() => navigate('/admin-login')} className="btn-login">Admin</button>
//         )}
//       </div>
//     </nav>
//   );
// };