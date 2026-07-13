import { useEffect, useState } from "react";
import { Dialog } from "../ui/dialog";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/admin/order-slice";
import { Package } from "lucide-react";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) { dispatch(getOrderDetailsForAdmin(getId)); }

  useEffect(() => { dispatch(getAllOrdersForAdmin()); }, [dispatch]);
  useEffect(() => { if (orderDetails !== null) setOpenDetailsDialog(true); }, [orderDetails]);

  const statusColor = (status) => {
    if (status === "confirmed") return "var(--gold)";
    if (status === "rejected") return "#e05555";
    if (status === "delivered") return "#4ade80";
    return "var(--mist)";
  };

  return (
    <div className="p-8 min-h-screen" style={{ background: "var(--obsidian)" }}>
      <div className="mb-8">
        <p className="section-eyebrow mb-2">Management</p>
        <h1 className="section-title">All Orders</h1>
        <div className="divider-gold w-16 mt-4" />
      </div>

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
                  <td style={{ padding: "14px 16px", color: "var(--mist)", fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}>
                    ...{orderItem?._id.slice(-10)}
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--mist)", fontFamily: "'Jost', sans-serif", fontSize: "0.8rem" }}>
                    {orderItem?.orderDate.split("T")[0]}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span
                      className="px-3 py-1 text-[0.6rem] tracking-widest uppercase"
                      style={{ border: `1px solid ${statusColor(orderItem?.orderStatus)}`, color: statusColor(orderItem?.orderStatus), fontFamily: "'Jost', sans-serif" }}
                    >
                      {orderItem?.orderStatus}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--cream)", fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
                    ₹{orderItem?.totalAmount}
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
                        Manage
                      </button>
                      <AdminOrderDetailsView orderDetails={orderDetails} />
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20" style={{ border: "1px dashed rgba(201,169,110,0.2)" }}>
          <Package className="w-10 h-10 mb-4" style={{ color: "rgba(201,169,110,0.3)" }} />
          <p className="text-base" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--cream)" }}>No orders yet</p>
        </div>
      )}
    </div>
  );
}

export default AdminOrdersView;
