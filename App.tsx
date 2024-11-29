import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AdminGuard } from "./components/Guards/AdminGuard";
import { UserGuard } from "./components/Guards/UserGuard";
import { ContactUs } from "./components/UserLayout/Legal/ContactUs";
import { PrivacyPolicy } from "./components/UserLayout/Legal/PrivacyPolicy";
import { TermsOfService } from "./components/UserLayout/Legal/TermsOfService";
import { useAuth } from "./context/Auth/useAuth";
import { AuthLayout } from "./pages/AccountPages/AuthLayout";
import { ForgotPassword } from "./pages/AccountPages/ForgotPassword";
import { Login } from "./pages/AccountPages/Login";
import { Register } from "./pages/AccountPages/Register";
import { ResetPassword } from "./pages/AccountPages/ResetPassword";
import { AdminLayout } from "./pages/AdminPages/AdminLayout";
import { EditUser } from "./pages/AdminPages/EditUser";
import { UsersList } from "./pages/AdminPages/UsersList";
import { AddressForm } from "./pages/UserPages/Addresses/AddressForm";
import { AddressList } from "./pages/UserPages/Addresses/AddressList";
import { Checkout } from "./pages/UserPages/Checkout/Checkout";
import { Dashboard } from "./pages/UserPages/Dashboard/Dashboard";
import { OrderDetails } from "./pages/UserPages/Orders/OrderDetails";
import { OrdersList } from "./pages/UserPages/Orders/OrdersList";
import { AddCreditCard } from "./pages/UserPages/PaymentMethods/AddCreditCard";
import { AddPayPal } from "./pages/UserPages/PaymentMethods/AddPayPal";
import { PaymentList } from "./pages/UserPages/PaymentMethods/PaymentList";
import { ProductDetails } from "./pages/UserPages/Products/ProductDetails";
import { Products } from "./pages/UserPages/Products/Products";
import { Profile } from "./pages/UserPages/Profile/Profile";
import { UserLayout } from "./pages/UserPages/UserLayout";
import { WishList } from "./pages/UserPages/Wishlist/Wishlist";

// Define the rules for the user roles
const Rules = {
	ADMIN: "admin",
	USER: "user",
};

function App() {
	// Get the authentication state and user from the context
	const { isAuthenticated, user } = useAuth();

	// If user is not authenticated, show the auth layout
	if (!isAuthenticated) {
		return (
			<AuthLayout>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route path="*" element={<Navigate to="/login" replace />} />
				</Routes>
			</AuthLayout>
		);
	}

	// If user is authenticated and is an admin, show the admin layout
	if (user?.role === Rules.ADMIN) {
		return (
			<Routes>
				<Route
					path="/admin"
					element={
						<AdminGuard>
							<AdminLayout />
						</AdminGuard>
					}
				>
					<Route index element={<Navigate to="users" replace />} />
					<Route path="users" element={<UsersList />} />
					<Route path="users/:id/edit" element={<EditUser />} />
					<Route path="*" element={<Navigate to="users" replace />} />
				</Route>
				<Route path="*" element={<Navigate to="/admin/users" replace />} />
			</Routes>
		);
	}

	// If user is authenticated and is a user, show the user layout
	if (user?.role === Rules.USER) {
		return (
			<Routes>
				<Route
					path="/"
					element={
						<UserGuard>
							<UserLayout />
						</UserGuard>
					}
				>
					<Route index element={<Navigate to="/products" replace />} />
					<Route path="products">
						<Route index element={<Products />} />
						<Route path=":productId" element={<ProductDetails />} />
					</Route>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="wishlist" element={<WishList />} />
					<Route path="orders">
						<Route index element={<OrdersList />} />
						<Route path=":orderId" element={<OrderDetails />} />
					</Route>
					<Route path="addresses">
						<Route index element={<AddressList />} />
						<Route path="new" element={<AddressForm />} />
						<Route path=":addressId/edit" element={<AddressForm />} />
					</Route>
					<Route path="payment-methods">
						<Route index element={<PaymentList />} />
						<Route path="new-card" element={<AddCreditCard />} />
						<Route path="new-paypal" element={<AddPayPal />} />
					</Route>
					<Route path="checkout" element={<Checkout />} />
					<Route path="profile" element={<Profile />} />
					<Route path="legal">
						<Route path="privacy" element={<PrivacyPolicy />} />
						<Route path="terms" element={<TermsOfService />} />
						<Route path="contact" element={<ContactUs />} />
					</Route>
				</Route>
				<Route path="*" element={<Navigate to="/products" replace />} />
			</Routes>
		);
	}

	// If user is authenticated but the role is not defined, show the login page
	return <Navigate to="/login" replace />;
}

export default App;
