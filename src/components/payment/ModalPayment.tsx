import React, { useState } from "react";
import { Modal, Button, Form, message } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import "./ModalPayment.css";
import { plans } from "./constants";
import { createPayment } from "@/src/services/payment";

interface ModalPaymentProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalPayment: React.FC<ModalPaymentProps> = ({ isOpen, onClose }) => {
  const handleChoose = async (plan: (typeof plans)[number]) => {
    console.log("Selected plan:", plan.name, "- Amount:", plan.amount);
    try {
      const response = await createPayment(plan.amount);
      window.location.href = response.data;
    } catch (error) {
      message.error("Lỗi khi tạo đơn hàng");
      console.log(error);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={900}
      centered
      className="pricing-modal !w-[65vw]"
      title={
        <div className="text-center">
          <div className="text-indigo-500 font-semibold text-lg mb-2">
            Pricing Plans
          </div>
          <h2 className="text-3xl font-bold mb-2">
            Choose the perfect plan for your needs
          </h2>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 py-5">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-indigo-50 rounded-2xl p-8 flex flex-col items-center shadow-md border-2 ${
              plan.highlight
                ? "border-yellow-400 bg-white scale-105 z-10"
                : "border-transparent"
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-xs font-bold px-4 py-1 rounded-full shadow">
                {plan.badge}
              </div>
            )}
            <div className="text-xl font-bold mb-2">{plan.name}</div>
            <div className="text-3xl font-extrabold mb-1">{plan.price}</div>
            <div className="text-gray-500 mb-4">{plan.annual}</div>
            <div className="text-center text-gray-700 mb-6">
              {plan.description}
            </div>
            <ul className="text-left mb-6 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <CheckOutlined className="text-green-500 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              type="primary"
              className="w-full !bg-indigo-500 !border-indigo-500 !rounded-lg !h-12 !text-lg font-semibold"
              size="large"
              onClick={() => handleChoose(plan)}
            >
              {plan.button}
            </Button>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ModalPayment;
