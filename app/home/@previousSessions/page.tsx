"use client";

import { useState, useEffect } from "react";

import { UserSessionsData } from "@/types";
import { API } from "@/api";
import PreviousSessionRows from "@/components/HomePage/PreviousSessionRows";
import Pagination from "@/components/Pagination";
import { getUserId } from "@/utils";

export const NUMBER_OF_ROWS = 4;

const PreviousSessions = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [userSessions, setUserSessions] = useState<UserSessionsData>({
    rows: [],
    count: 0,
  });
  const fetchUserSessions = async (
    rowsToFetch: number,
    rowsOffset?: number
  ) => {
    const userSessionsData: UserSessionsData = await API.getUserSessions(
      getUserId(),
      rowsToFetch,
      rowsOffset
    );
    setUserSessions(userSessionsData);
  };

  useEffect(() => {
    fetchUserSessions(NUMBER_OF_ROWS);
  }, []);

  useEffect(() => {
    fetchUserSessions(NUMBER_OF_ROWS, currentPage);
  }, [currentPage]);

  const tableHeadings = ["Name", "Status", "Participants"].map((heading) => (
    <th
      key={heading}
      className="text-center font-bold text-base tracking-wide text-gray py-3 px-0 first:ps-0 first:md:ps-8 last:pe-0 last:md:pe-8 border-b border-b-lighter-grey border-solid"
    >
      {heading}
    </th>
  ));

  return (
    <div className="relative w-10/12 p-5 md:w-1/2 md:p-8 md:border-b md:border-b-light-grey md:border-solid">
      <h1 className="text-almost-black text-3xl mb-4">Previous Sessions</h1>
      {userSessions.count > 0 ? (
        <>
          <div>
            <table className="w-full">
              <thead>
                <tr>{tableHeadings}</tr>
              </thead>
              <tbody>
                {userSessions.rows.map((row) => PreviousSessionRows(row!))}
              </tbody>
            </table>
          </div>
          <Pagination
            total={userSessions.count}
            currentPageSetter={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      ) : (
        <div className="flex items-center justify-center">
          <h2 className="align-middle text-gray text-2xl self-center">
            No sessions found
          </h2>
        </div>
      )}
    </div>
  );
};

export default PreviousSessions;
