import pages from "./Pages.module.scss";
import res from "../containers/Responses/Responses.module.scss";
import {useState} from "react";
import {ResponsesForm} from "../containers/Responses/ResponsesForm";
import {ResponsesList} from "../containers/Responses/ResponsesList";

export const TestimonialsPage = () => {
    const [isActiveForm, setActiveForm] = useState(false)

    return(
        <div className={`${pages.containerTestimonialsPage} ${pages.container}`}>
            <h2 style={{marginBottom: '15px'}} className={res.aboutTitle}>Відгуки про компанію SPACE</h2>
            <button style={{marginBottom: '15px'}} onClick={()=>setActiveForm(true)} className={res.aboutBtn}>Додати відгук</button>
            {isActiveForm &&   <ResponsesForm setActiveForm={setActiveForm}/>}
            <div className={res.aboutListWrapper}>
                <ResponsesList reducedList={false}/>
            </div>
        </div>
    )
}