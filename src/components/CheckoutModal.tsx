import { MovieList } from "@/types/movie";
import { useState, useEffect } from "react";

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
  const [accountNumber, setAccountNumber] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds = 1 minute
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      setTimeLeft(60);
      setIsTimeUp(false);
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsTimeUp(true);
            onClose();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Confirm Purchase</h2>
          <span className="text-red-500 font-mono">
            Time remaining: {formatTime(timeLeft)}
          </span>
        </div>
        
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

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bank Account Number
          </label>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            KASIKORN
          </label>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            5752258599
          </label>
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
            disabled={!accountNumber || isTimeUp}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors duration-200 
              ${accountNumber && !isTimeUp 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-400 cursor-not-allowed text-gray-200'}`}
          >
            Confirm
          </button>
        </div>

        {isTimeUp && (
          <p className="text-red-500 text-center mt-4">
            Time's up! Please try again.
          </p>
        )}
      </div>
    </div>
  );
}