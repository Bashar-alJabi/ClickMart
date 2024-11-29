import { AxiosError } from "axios";
import { Address, AddressFormData } from "../types/address";
import {
	EditUserCredentials,
	LoginCredentials,
	LoginResponse,
	RegisterCredentials,
	RegisterResponse,
	UpdateProfileCredentials,
	UpdateProfileResponse,
	User,
} from "../types/auth";
import { DashboardData, Notification } from "../types/dashboard";
import { CreateOrderRequest, Order } from "../types/order";
import { AddPaymentData, PaymentMethod } from "../types/payment";
import { Product, ProductFilters, ProductsResponse } from "../types/product";
import { axiosInstance } from "./axios";

/* All APIs
* AUTH
	* Login: (POST) /login
	* Register: (POST) /register
	* Forgot Password: (POST) /forgot-password
	* Reset Password: (POST) /reset-password
* ADMIN
	* Get Users: (GET) /admin/users
	* Get User by ID: (GET) /admin/users/:userId
	* Update User: (PUT) /admin/users/:userId
	* Delete User: (DELETE) /admin/users/:userId
* NOTIFICATIONS
	* Get Notifications: (GET) /notifications
	* Mark Notification as Read: (POST) /notifications/:notificationId/read
	* Mark All Notifications as Read: (POST) /notifications/read-all
	* Delete Notification: (DELETE) /notifications/:notificationId
	* Clear All Notifications: (DELETE) /notifications
* PROFILE
	* Update Profile: (PUT) /profile
	* Delete Profile: (DELETE) /profile
* PRODUCTS
	* Get Products: (GET) /products
	* Get Product by ID: (GET) /products/:productId
* WISHLIST
	* Get Wishlist Items: (GET) /wishlist
	* Add to Wishlist: (POST) /wishlist/:productId
	* Remove from Wishlist: (DELETE) /wishlist/:productId
* DASHBOARD
	* Get Dashboard Data: (GET) /dashboard
* ORDERS
	* Get Orders: (GET) /orders
	* Get Order by ID: (GET) /orders/:orderId
* ADDRESSES
	* Get Addresses: (GET) /addresses
	* Get Address by ID: (GET) /addresses/:addressId
	* Create Address: (POST) /addresses
	* Update Address: (PUT) /addresses/:addressId
	* Delete Address: (DELETE) /addresses/:addressId
	* Set Default Address: (PATCH) /addresses/:addressId/default
* PAYMENT METHODS
	* Get Payment Methods: (GET) /payment-methods
	* Add Payment Method: (POST) /payment-methods
	* Update Payment Method: (PATCH) /payment-methods/:paymentId
	* Delete Payment Method: (DELETE) /payment-methods/:paymentId
	* Set Default Payment Method: (PATCH) /payment-methods/:paymentId/default
* ORDER CONFIRMATION (Checkout)
	* Create Order: (POST) /orders
	* Get Order: (GET) /orders/:orderId
*/

//* AUTH
// Login user
export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
	try {
		const { data } = await axiosInstance.post<LoginResponse>("/login", credentials);
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.message || "Email or password is incorrect");
		}
		throw error;
	}
};
// Register user
export const registerUser = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
	try {
		const { data } = await axiosInstance.post<RegisterResponse>("/register", credentials);
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.message || "Email already registered");
		}
		throw error;
	}
};
// Forgot password
export const forgotPassword = async (email: string): Promise<void> => {
	try {
		await axiosInstance.post("/forgot-password", { email });
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.message || "Failed to send reset email");
		}
		throw error;
	}
};
// Reset password
export const resetPassword = async (token: string, password: string): Promise<void> => {
	try {
		await axiosInstance.post("/reset-password", { token, password });
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.message || "Failed to reset password");
		}
		throw error;
	}
};

//* ADMIN
// Get all users (admin)
export const getUsers = async (): Promise<User[]> => {
	try {
		const { data } = await axiosInstance.get<User[]>("/admin/users");
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.message || "Failed to fetch users");
		}
		throw error;
	}
};
// Get user by ID (admin)
export const getUserById = async (userId: string): Promise<User> => {
	try {
		const { data } = await axiosInstance.get<User>(`/admin/users/${userId}`);
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to fetch user");
		}
		throw error;
	}
};
// Update user (admin)
export const updateUser = async (userId: string, userData: EditUserCredentials): Promise<User> => {
	try {
		const { data } = await axiosInstance.put<User>(`/admin/users/${userId}`, userData);
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to update user");
		}
		throw error;
	}
};
// Delete user (admin)
export const deleteUser = async (userId: string): Promise<void> => {
	try {
		await axiosInstance.delete(`/admin/users/${userId}`);
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to delete user");
		}
		throw error;
	}
};

//* NOTIFICATIONS
// Get notifications
export const getNotifications = async (): Promise<Notification[]> => {
	try {
		const { data } = await axiosInstance.get<Notification[]>("/notifications");
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response?.status === 401) {
				return [];
			}
			throw new Error(error.response?.data?.detail || "Failed to fetch notifications");
		}
		throw error;
	}
};
// Mark notification as read
export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
	try {
		await axiosInstance.post(`/notifications/${notificationId}/read`);
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to mark notification as read");
		}
		throw error;
	}
};
// Mark all notifications as read
export const markAllNotificationsAsRead = async (): Promise<void> => {
	try {
		await axiosInstance.post("/notifications/read-all");
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to mark all notifications as read");
		}
		throw error;
	}
};
// Delete notification
export const deleteNotification = async (notificationId: string): Promise<void> => {
	try {
		await axiosInstance.delete(`/notifications/${notificationId}`);
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to delete notification");
		}
		throw error;
	}
};
// Clear all notifications
export const clearAllNotifications = async (): Promise<void> => {
	try {
		await axiosInstance.delete("/notifications");
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to clear notifications");
		}
		throw error;
	}
};

//* PROFILE
// Update profile (user)
export const updateProfile = async (data: UpdateProfileCredentials): Promise<UpdateProfileResponse> => {
	try {
		const response = await axiosInstance.put<UpdateProfileResponse>("/profile", data);
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to update profile");
		}
		throw error;
	}
};
// Delete profile (user)
export const deleteProfile = async (): Promise<void> => {
	try {
		await axiosInstance.delete("/profile");
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to delete account");
		}
		throw error;
	}
};

//* PRODUCTS
// Get products with filters
export const getProducts = async (filters?: ProductFilters): Promise<ProductsResponse> => {
	try {
		const params = {
			...filters,
			sort_by: filters?.sortBy,
			sortBy: undefined,
		};

		const { data } = await axiosInstance.get<ProductsResponse>("/products", {
			params,
		});
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to fetch products");
		}
		throw error;
	}
};
// Get product by ID
export const getProductById = async (productId: string): Promise<Product> => {
	try {
		const { data } = await axiosInstance.get<Product>(`/products/${productId}`);
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to fetch product");
		}
		throw error;
	}
};

//* WISHLIST
// Get wishlist items
export const getWishlistItems = async (): Promise<Product[]> => {
	try {
		const { data } = await axiosInstance.get<Product[]>("/wishlist");
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to fetch wishlist");
		}
		throw error;
	}
};
// Add item to wishlist
export const addToWishlist = async (productId: string): Promise<void> => {
	try {
		await axiosInstance.post(`/wishlist/${productId}`);
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to add item to wishlist");
		}
		throw error;
	}
};
// Remove item from wishlist
export const removeFromWishlist = async (productId: string): Promise<void> => {
	try {
		await axiosInstance.delete(`/wishlist/${productId}`);
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to remove item from wishlist");
		}
		throw error;
	}
};

//* DASHBOARD
// Get dashboard data
export const getDashboardData = async (): Promise<DashboardData> => {
	try {
		const { data } = await axiosInstance.get<DashboardData>("/dashboard");
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to fetch dashboard data");
		}
		throw error;
	}
};

//* ORDERS
// Get all orders
export const getOrders = async (): Promise<Order[]> => {
	try {
		const { data } = await axiosInstance.get<Order[]>("/orders");
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response?.status === 401) {
				// Handle unauthorized
				throw new Error("Please log in to view orders");
			}
			throw new Error(error.response?.data?.detail || "Failed to fetch orders");
		}
		throw new Error("An unexpected error occurred");
	}
};
// Get order by ID
export const getOrderById = async (orderId: string): Promise<Order> => {
	try {
		const { data } = await axiosInstance.get<Order>(`/orders/${orderId}`);
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to fetch order");
		}
		throw error;
	}
};

//* ADDRESSES
// Get all addresses
export const getAddresses = async (): Promise<Address[]> => {
	try {
		const { data } = await axiosInstance.get<Address[]>("/addresses");
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to fetch addresses");
		}
		throw error;
	}
};
// Get address by ID
export const getAddressById = async (addressId: string): Promise<Address> => {
	try {
		const { data } = await axiosInstance.get<Address>(`/addresses/${addressId}`);
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to fetch address");
		}
		throw error;
	}
};
// Create address
export const createAddress = async (address: AddressFormData): Promise<Address> => {
	try {
		const { data } = await axiosInstance.post<Address>("/addresses", address);
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to create address");
		}
		throw error;
	}
};
// Update address
export const updateAddress = async (addressId: string, address: AddressFormData): Promise<Address> => {
	try {
		const { data } = await axiosInstance.put<Address>(`/addresses/${addressId}`, address);
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to update address");
		}
		throw error;
	}
};
// Delete address
export const deleteAddress = async (addressId: string): Promise<void> => {
	try {
		await axiosInstance.delete(`/addresses/${addressId}`);
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to delete address");
		}
		throw error;
	}
};
// Set default address
export const setDefaultAddress = async (addressId: string): Promise<void> => {
	try {
		await axiosInstance.patch(`/addresses/${addressId}/default`);
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to set default address");
		}
		throw error;
	}
};

//* PAYMENT METHODS
// Get payment methods
export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
	try {
		const { data } = await axiosInstance.get<PaymentMethod[]>("/payment-methods");
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to fetch payment methods");
		}
		throw error;
	}
};
// Add payment method
export const addPaymentMethod = async (paymentData: AddPaymentData): Promise<PaymentMethod> => {
	try {
		const { data } = await axiosInstance.post<PaymentMethod>("/payment-methods", paymentData);
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to add payment method");
		}
		throw error;
	}
};
// Update payment method
export const updatePaymentMethod = async (
	paymentId: string,
	data: {
		expiryMonth?: string;
		expiryYear?: string;
		isDefault?: boolean;
	}
): Promise<PaymentMethod> => {
	try {
		const { data: response } = await axiosInstance.patch<PaymentMethod>(`/payment-methods/${paymentId}`, data);
		return response;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to update payment method");
		}
		throw error;
	}
};
// Delete payment method
export const deletePaymentMethod = async (paymentId: string): Promise<void> => {
	try {
		await axiosInstance.delete(`/payment-methods/${paymentId}`);
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to delete payment method");
		}
		throw error;
	}
};
// Set default payment method
export const setDefaultPaymentMethod = async (paymentId: string): Promise<void> => {
	try {
		await axiosInstance.patch(`/payment-methods/${paymentId}/default`);
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to set default payment method");
		}
		throw error;
	}
};

//* ORDER CONFIRMATION (Checkout)
// Create order
export const createOrder = async (orderData: CreateOrderRequest): Promise<Order> => {
	try {
		const { data } = await axiosInstance.post<Order>("/orders", orderData);
		return data;
	} catch (error) {
		console.error("Create order error:", error);
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to create order. Please try again.");
		}
		throw new Error("An unexpected error occurred");
	}
};
// Get order
export const getOrder = async (orderId: string): Promise<Order> => {
	try {
		const { data } = await axiosInstance.get<Order>(`/orders/${orderId}`);
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data?.detail || "Failed to fetch order");
		}
		throw error;
	}
};