import React, {useState} from "react";


const OrderCard = ({ order, onUpdateStatus }) => {
  const [showAddress, setShowAddress] = useState(false);

  const variant =
    order.product?.variants?.[order.variantIndex];
  const size = variant?.sizes?.[order.sizeIndex];
  const price = size?.price || variant?.price || order.amount;

  return (
    <div className="group relative bg-white border rounded shadow-sm hover:shadow-lg transition overflow-hidden ">
      {/* MAIN */}
      <div className="grid grid-cols-8 gap-2 p-2 h-40">
        <div className="col-span-2">
          <img
            src={variant?.images?.[0] || "/placeholder.png"}
            className="w-full h-full object-cover rounded"
          />
        </div>

        <div className="col-span-6 flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-sm">
              {order.product?.title}
            </h2>

            <div className="flex flex-wrap gap-1 text-xs mt-1">
              <span className="bg-gray-100 px-2 py-1 rounded">
                Color: {variant?.color}
              </span>
              {size && (
                <span className="bg-gray-100 px-2 py-1 rounded">
                  Size: {size.size}
                </span>
              )}
              <span className="bg-gray-100 px-2 py-1 rounded">
                Qty: {order.quantity}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-bold text-green-600">
              ₹{price}
            </span>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
              {order.status}
            </span>
          </div>
        </div>
      </div>

      {/* STATUS */}
      <select
        value={order.status}
        onChange={(e) =>
          onUpdateStatus(order._id, e.target.value)
        }
        className="absolute top-2 right-2 text-xs border rounded p-1"
      >
        <option value="PLACED">Placed</option>
        <option value="SHIPPED">Shipped</option>
        <option value="OUT_FOR_DELIVERY">
          Out for Delivery
        </option>
        <option value="DELIVERED">Delivered</option>
        <option value="CANCELLED">Cancelled</option>
        <option value="RETURNED">Returned</option>
      </select>

      {/* MOBILE TOGGLE */}
      <button
        onClick={() => setShowAddress((p) => !p)}
        className="md:hidden absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded"
      >
        {showAddress ? "Hide Address" : "View Address"}
      </button>

      {/* ADDRESS */}
      <div
        className={`absolute inset-0 bg-gray-100/90 backdrop-blur-sm p-3 transition-all
        ${showAddress ? "translate-y-0" : "translate-y-full"}
        md:group-hover:translate-y-0`}
      >
        <p className="text-xs font-semibold mb-1">
          Delivery Address
        </p>
        <p className="text-xs">
          {order.address.firstName} {order.address.lastName}
        </p>
        <p className="text-xs">{order.address.phone}</p>
        <p className="text-xs">
          {order.address.street}, {order.address.city}
        </p>
        <p className="text-xs">{order.address.pinCode}</p>
      </div>
    </div>
  );
};

export default OrderCard