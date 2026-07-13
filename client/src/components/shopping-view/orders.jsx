import { useEffect, useState } from "react";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails } from "@/store/shop/order-slice";
import { Package } from "lucide-react";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  const statusColor = (status) => {
    if (status === "confirmed") return "var(--gold)";
    if (status === "rejected") return "#e05555";
    return "var(--mist)";
  };

  return (
    <div>
      <h2 className="text-xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--cream)" }}>
        Order History
      </h2>

      {orderList && orderList.length > 0 ? (
        <div style={{ border: "1px solid rgba(201,169,110,0.1)", overflow: "hidden" }}>
          <table className="w-full luxury-table">
            <thead>
              <tr style={{ background: "var(--charcoal)" }}>
                <th className="text-left">Order ID</th>
                <th className="text-left">Date</th>
                <th className="text-left">Status</th>
                <th className="text-left">Amount</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {orderList.map((orderItem) => (
                <tr key={orderItem._id} style={{ background: "var(--smoke)" }}>
                  <td className="luxury-table" style={{ padding: "14px 16px", color: "var(--mist)", fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}>
                    ...{orderItem?._id.slice(-8)}
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--mist)", fontFamily: "'Jost', sans-serif", fontSize: "0.8rem" }}>
                    {orderItem?.orderDate.split("T")[0]}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span
                      className="px-3 py-1 text-[0.6rem] tracking-widest uppercase"
                      style={{
                        border: `1px solid ${statusColor(orderItem?.orderStatus)}`,
                        color: statusColor(orderItem?.orderStatus),
                        fontFamily: "'Jost', sans-serif",
                      }}
                    >
                      {orderItem?.orderStatus}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--cream)", fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
                    ${orderItem?.totalAmount}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={() => { setOpenDetailsDialog(false); dispatch(resetOrderDetails()); }}
                    >
                      <button
                        onClick={() => handleFetchOrderDetails(orderItem?._id)}
                        className="text-[0.6rem] tracking-widest uppercase px-4 py-1.5 transition-all duration-200"
                        style={{ border: "1px solid rgba(201,169,110,0.3)", color: "var(--gold)", fontFamily: "'Jost', sans-serif" }}
                      >
                        Details
                      </button>
                      <ShoppingOrderDetailsView orderDetails={orderDetails} />
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-20"
          style={{ border: "1px dashed rgba(201,169,110,0.2)" }}
        >
          <Package className="w-10 h-10 mb-4" style={{ color: "rgba(201,169,110,0.3)" }} />
          <p className="text-base" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--cream)" }}>
            No orders yet
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}>
            Start shopping to see your orders here
          </p>
        </div>
      )}
    </div>
  );
}

export default ShoppingOrders;
