"use client";

import { Button, Result } from "antd";
import type { ResultStatusType } from "antd/es/result";
import { useRouter } from "next/navigation";

interface ErrorPageProps {
  status?: ResultStatusType;
  title?: string;
  subTitle?: string;
  backHome?: boolean;
}

export default function ErrorPage({
  status = "404",
  title,
  subTitle,
  backHome = true,
}: ErrorPageProps) {
  const router = useRouter();

  return (
    <Result
      status={status}
      title={title || status}
      subTitle={subTitle || "Có lỗi xảy ra. Vui lòng thử lại sau."}
      extra={
        backHome && (
          <Button type="primary" onClick={() => router.push("/")}>
            Về trang chủ
          </Button>
        )
      }
    />
  );
}
