import res from "./Responses.module.scss";
import { Rate } from "antd";

export const ResponseItem = ({ name, date, rating, text }) => {
  return (
    <li className={res.listItem}>
      <div className={res.listContent}>
        <div className={res.listName}>{name}</div>
        <div className={res.listDate}>
          <span>{date}</span>
        </div>
        <Rate style={{ marginBottom: "8px" }} disabled value={rating} />
        <div className={res.listText}>"{text}"</div>
      </div>
    </li>
  );
};
