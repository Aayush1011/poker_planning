import { NUMBER_OF_ROWS } from "@/app/home/@previousSessions/page";
import { PaginationProps } from "@/types";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { BsChevronDoubleRight } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";

const Pagination = ({
  total,
  currentPageSetter,
  currentPage,
}: PaginationProps) => {
  const numberOfPages = Math.ceil(total / NUMBER_OF_ROWS);
  return (
    <div className="absolute flex items-center gap-x-10  bottom-10 left-1/3">
      <div className="flex gap-x-5">
        <div
          className="cursor-pointer text-xl"
          onClick={() =>
            currentPageSetter((previousPage) =>
              previousPage !== 0 ? 0 : previousPage
            )
          }
        >
          <BsChevronDoubleLeft />
        </div>
        <div
          className="cursor-pointer text-xl"
          onClick={() =>
            currentPageSetter((previousPage) =>
              previousPage !== 0 ? previousPage - 1 : previousPage
            )
          }
        >
          <BsChevronLeft />
        </div>
      </div>
      <div className="flex items-center gap-x-5">
        {Array.from(Array(numberOfPages).keys()).map((number) => (
          <div
            key={`${number}`}
            className={`cursor-pointer font-semibold text-sm text-center ${
              currentPage === number &&
              "rounded-full bg-main-orange w-full py-2 px-4 text-white"
            }`}
            onClick={() => currentPageSetter(number)}
          >
            {number + 1}
          </div>
        ))}
      </div>
      <div className="flex gap-x-5">
        <div
          className="cursor-pointer text-xl"
          onClick={() =>
            currentPageSetter((previousPage) =>
              previousPage !== numberOfPages - 1
                ? previousPage + 1
                : previousPage
            )
          }
        >
          <BsChevronRight />
        </div>
        <div
          className="cursor-pointer text-xl"
          onClick={() =>
            currentPageSetter((previousPage) =>
              previousPage !== numberOfPages - 1 ? numberOfPages : previousPage
            )
          }
        >
          <BsChevronDoubleRight />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
