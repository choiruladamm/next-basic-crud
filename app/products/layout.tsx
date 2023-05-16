import React, { ReactNode } from "react";

export const metadata = {
  title: "Products",
};

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-10 py-10">{children}</div>;
};

export default ProductLayout;
