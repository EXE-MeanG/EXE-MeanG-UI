import ErrorPage from "@/src/components/errors";

export default function NotFound() {
  return <ErrorPage status="404" subTitle="Trang bạn tìm không tồn tại." />;
}
