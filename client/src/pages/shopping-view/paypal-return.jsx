import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { paymentProcessed } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderID = params.get("token");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (orderID && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      dispatch(paymentProcessed({ paymentId: orderID, payerId, orderId })).then(
        (data) => {
          if (data?.payload?.success) {
            sessionStorage.removeItem("currentOrderId");
            window.location.href = "/shop/payment-success";
          }
        }
      );
    }
  }, [orderID, payerId, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing payment.... Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}
export default PaypalReturnPage;
