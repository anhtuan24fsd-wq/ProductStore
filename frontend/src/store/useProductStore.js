import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

// Base URL sẽ thay đổi tùy thuộc vào môi trường
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "";

export const useProductStore = create((set, get) => ({
  // Trạng thái danh sách sản phẩm
  products: [],
  loading: false,
  error: null,
  currentProduct: null,

  // Trạng thái form
  formData: {
    name: "",
    price: "",
    image: "",
  },

  // Cập nhật dữ liệu form
  setFormData: (formData) => set({ formData }),

  // Reset form về trạng thái ban đầu
  resetForm: () => set({ formData: { name: "", price: "", image: "" } }),

  // Thêm sản phẩm mới
  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetForm();
      toast.success("Thêm sản phẩm thành công");
      document.getElementById("add_product_modal").close();
    } catch (error) {
      console.log("Error in addProduct function", error);
      toast.error("Đã có lỗi xảy ra");
    } finally {
      set({ loading: false });
    }
  },

  // Lấy danh sách tất cả sản phẩm
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ products: response.data.data, error: null });
    } catch (err) {
      if (err.status == 429)
        set({ error: "Vượt quá giới hạn yêu cầu", products: [] });
      else set({ error: "Đã có lỗi xảy ra", products: [] });
    } finally {
      set({ loading: false });
    }
  },

  // Xóa sản phẩm theo ID
  deleteProduct: async (id) => {
    console.log("deleteProduct function called", id);
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      toast.success("Xóa sản phẩm thành công");
    } catch (error) {
      console.log("Error in deleteProduct function", error);
      toast.error("Đã có lỗi xảy ra");
    } finally {
      set({ loading: false });
    }
  },

  // Lấy thông tin chi tiết một sản phẩm theo ID
  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({
        currentProduct: response.data.data,
        formData: response.data.data, // Điền trước dữ liệu vào form
        error: null,
      });
    } catch (error) {
      console.log("Error in fetchProduct function", error);
      set({ error: "Đã có lỗi xảy ra", currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },

  // Cập nhật thông tin sản phẩm theo ID
  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await axios.put(
        `${BASE_URL}/api/products/${id}`,
        formData
      );
      set({ currentProduct: response.data.data });
      toast.success("Cập nhật sản phẩm thành công");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
      console.log("Error in updateProduct function", error);
    } finally {
      set({ loading: false });
    }
  },
}));
