// app/not-found.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Result } from "antd";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Trang bạn tìm không tồn tại."
      extra={
        <Button type="primary" onClick={() => router.push("/")}>
          Về trang chủ
        </Button>
      }
    />
  );
}
