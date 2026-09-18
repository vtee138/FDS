export default function AuthAlert({
  kind,
  message,
}: {
  kind: "error" | "success" | "info";
  message: string;
}) {
  const styles =
    kind === "error"
      ? "border-red-200 bg-red-50 text-red-700"
      : kind === "success"
        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
        : "border-[#2457A6]/25 bg-[#EFF6FF] text-[#2457A6]";
  return (
    <div
      role={kind === "error" ? "alert" : "status"}
      className={`border rounded-[3px] px-3.5 py-2.5 text-sm leading-relaxed ${styles}`}
    >
      {message}
    </div>
  );
}
