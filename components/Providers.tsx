"use client";

import CartDrawer from "./CartDrawer";
import ToastContainer from "./Toast";
import WhatsAppButton from "./WhatsAppButton";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CartDrawer />
      <ToastContainer />
      <WhatsAppButton />
    </>
  );
}
