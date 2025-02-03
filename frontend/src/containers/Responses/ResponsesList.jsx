import res from "./Responses.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { ResponseItem } from "./ResponseItem";
import { PaginationBlock } from "../../components/Pagination/Pagination";

export const ResponsesList = ({ reducedList = false }) => {
  const url = import.meta.env.VITE_BACKEND_BASE_URL;
  const quantity = 4;
  const [responsesListJSX, setResponsesListJSX] = useState();

  const pageSize = 8;
  const [pageNumber, setPageNumber] = useState("1");
  const [totalCount, setTotalCount] = useState(null);

  const getResponses = async () => {
    const data = await axios
      .get(
        `${url}/api/responses?pagination[page]=${pageNumber}&pagination[pageSize]=${pageSize}&sort[1]=id:desc`
      )
      .then((res) => res.data);

    setTotalCount(data.meta.pagination.total);
    console.log(data.data);
    if (reducedList) {
      const responsesList = data.data.slice(0, quantity).map((el, index) => {
        const date = el.attributes.publishedAt.slice(0, 10);
        return (
          <ResponseItem
            name={el.attributes.name}
            date={date}
            rating={el.attributes.rating}
            text={el.attributes.text}
            key={index}
          />
        );
      });
      setResponsesListJSX(responsesList);
    } else {
      const responsesList = data.data.map((el) => {
        const date = el.attributes.publishedAt.slice(0, 10);
        return (
          <ResponseItem
            name={el.attributes.name}
            date={date}
            rating={el.attributes.rating}
            text={el.attributes.text}
          />
        );
      });
      setResponsesListJSX(responsesList);
    }
  };

  useEffect(() => {
    getResponses();
  }, [pageNumber]);
  return (
    <>
      <ul className={res.listList}>{responsesListJSX && responsesListJSX}</ul>
      {!reducedList && (
        <PaginationBlock
          total={totalCount}
          pageSize={pageSize}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
        />
      )}
    </>
  );
};
