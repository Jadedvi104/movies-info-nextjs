import { MovieList } from "@/types/movie";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cartItems: MovieList[];
  calculateTotal: () => number;
  calculateDiscount: () => number;
  calculateFinalTotal: () => number;
  formatPrice: (price: number | undefined) => string;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  onConfirm,
  cartItems,
  calculateTotal,
  calculateDiscount,
  calculateFinalTotal,
  formatPrice
}: CheckoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Confirm Purchase</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span>Items:</span>
            <span>{cartItems.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{formatPrice(calculateTotal())}</span>
          </div>
          {cartItems.length >= 3 && (
            <div className="flex justify-between text-green-600">
              <span>Discount:</span>
              <span>-{formatPrice(calculateDiscount())}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Tax:</span>
            <span>{formatPrice((calculateTotal() - calculateDiscount()) * 0.1)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-4 border-t">
            <span>Total:</span>
            <span>{formatPrice(calculateFinalTotal())}</span>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}