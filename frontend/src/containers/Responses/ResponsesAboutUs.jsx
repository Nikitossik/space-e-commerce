import res from "./Responses.module.scss";
import { ResponsesForm } from "./ResponsesForm";
import { useState } from "react";
import { ResponsesList } from "./ResponsesList";
import { NavLink } from "react-router-dom";

export const ResponsesAboutUs = () => {
  const [isActiveForm, setActiveForm] = useState(false);
  return (
    <div className={res.aboutWrapper}>
      <div className={res.aboutHeader}>
        <h2 className={res.aboutTitle}>Відгуки про компанію SPACE</h2>
        <div className={res.aboutButtons}>
          <button onClick={() => setActiveForm(true)} className={res.aboutBtn}>
            Додати відгук
          </button>
          <NavLink to={"/testimonials"} className={res.aboutBtnAll}>
            Всі відгуки
          </NavLink>
        </div>
      </div>
      {isActiveForm && <ResponsesForm setActiveForm={setActiveForm} />}
      <div className={res.aboutListWrapper}>
        <ResponsesList reducedList={true} />
      </div>
    </div>
  );
};
