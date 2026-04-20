import React from "react";
import OrderDetails from "../Details/Orders/OrderDetails";
import CommnetsDetails from "../Details/Comments/CommentDetails";
import TransactionDetails from "../Details/Transactions/TransactionDetails";
import SupportDetails from "../Details/Supports/SupportDetails";
import "./Modal.css";  // استایل‌ها را جدا نگه دار

export default function DetailModal({ isOpen, data, onClose, parent }) {
  if (!isOpen) return null;

  // --- محتوای پویا با توجه به parent
  const renderContent = () => {
    switch (parent) {
        case "orders":
            return (
                <OrderDetails />
            );

        case "comments":
            return (
                <CommnetsDetails />
            );
        case "payments" :
            return (
                <TransactionDetails />
            );
        case "supports":
            return (
                <SupportDetails />
            );
      // کامپوننت‌های دیگر هم به راحتی اضافه کن
      default:
        return <div>داده‌ای برای نمایش نیست</div>;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* جلوگیری از بسته‌شدن هنگام کلیک روی محتوای داخلی */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-body p-3 flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
