"use client";

import { PreviousSessionRowsProps } from "@/types";
import { useRouter } from "next/navigation";

const PreviousSessionRows = ({
  name,
  status,
  participantCount,
  id,
  description,
}: PreviousSessionRowsProps) => {
  const router = useRouter();

  const goToSession = () => {
    router.push(`/session/${id}`);
  };

  return (
    <tr
      key={id}
      className="hover:bg-main-blue-opacity hover:cursor-pointer"
      onClick={() => goToSession()}
    >
      <td className="sessions-table__data">{name}</td>
      <td className="sessions-table__data">{status}</td>
      <td className="sessions-table__data">{participantCount}</td>
    </tr>
  );
};

export default PreviousSessionRows;
