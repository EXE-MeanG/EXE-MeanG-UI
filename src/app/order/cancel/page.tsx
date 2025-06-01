'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, Typography, Button } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function OrderCancel() {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState({
    code: '',
    id: '',
    status: '',
    orderCode: ''
  });

  useEffect(() => {
    const code = searchParams.get('code');
    const id = searchParams.get('id');
    const status = searchParams.get('status');
    const orderCode = searchParams.get('orderCode');

    setOrderDetails({
      code: code || '',
      id: id || '',
      status: status || '',
      orderCode: orderCode || ''
    });
  }, [searchParams]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 text-center">
        <CloseCircleFilled style={{ fontSize: '64px', color: '#ff4d4f' }} />
        <Title level={2} className="mt-4">Thanh toán thất bại</Title>
        <div className="mt-6 space-y-2">
          <Text>Mã đơn hàng: {orderDetails.orderCode}</Text>
          <br />
          <Text>Mã giao dịch: {orderDetails.id}</Text>
          <br />
          <Text>Trạng thái: {orderDetails.status}</Text>
          <br />
          <Text>Mã phản hồi: {orderDetails.code}</Text>
        </div>
        <div className="mt-8 space-x-4">
          <Link href="/">
            <Button type="primary" size="large">
              Trở lại trang chủ
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
} 