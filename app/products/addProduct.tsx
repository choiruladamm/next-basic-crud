"use client";

import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import type { Brand } from "@prisma/client";
import axios from "axios";

const AddProduct = ({ brands }: { brands: Brand[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");

  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("/api/products", {
      title: title,
      price: Number(price),
      brandId: Number(brand),
    });
    setTitle("");
    setPrice("");
    setBrand("");
    router.refresh();
    setIsOpen(false);
  };

  return (
    <div>
      <button className="btn" onClick={handleModal}>
        Add New
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="mb-5 text-lg font-bold text-center">
            Add New Product
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="w-full form-control">
              <label className="font-bold label">Product Name</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered"
                placeholder="Product Name"
              />
            </div>
            <div className="w-full form-control">
              <label className="font-bold label">Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input input-bordered"
                placeholder="Price"
              />
            </div>
            <div className="w-full form-control">
              <label className="font-bold label">Brand</label>
              <select
                className="select select-border"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option disabled>Select a Brand</option>
                {brands.map((brand) => (
                  <option value={brand.Id} key={brand.Id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
