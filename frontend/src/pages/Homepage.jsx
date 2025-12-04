import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { PackageIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import ProductCard from "../components/ProductCard";

function HomePage() {
  // Lấy các state và function từ store
  const { products, loading, error, fetchProducts } = useProductStore();

  // Fetch products khi component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 ">
      {/* Header với nút thêm sản phẩm và refresh */}
      <div className="flex justify-between items-center mb-8">
        <button
          className="btn btn-primary"
          onClick={() =>
            document.getElementById("add_product_modal").showModal()
          }
        >
          <PlusCircleIcon className="size-5 mr-2" />
          Thêm sản phẩm
        </button>
        <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
          <RefreshCwIcon className="size-5" />
        </button>
      </div>

      {/* Hiển thị lỗi nếu có */}
      {error && <div className="alert alert-error mb-8">{error}</div>}

      {/* Hiển thị thông báo khi không có sản phẩm */}
      {products.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold ">Không tìm thấy sản phẩm</h3>
            <p className="text-gray-500 max-w-sm">
              Bắt đầu bằng cách thêm sản phẩm đầu tiên vào kho hàng
            </p>
          </div>
        </div>
      )}

      {/* Hiển thị loading hoặc danh sách sản phẩm */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

export default HomePage;
