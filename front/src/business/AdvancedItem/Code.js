import css from "./Code.module.css";

export const Code = ({ title, code }) => {
    return (
        <div className={css.code}>
            <h4>{title}</h4>
            <code>{code}</code>
        </div>
    );
};