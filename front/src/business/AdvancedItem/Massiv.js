import {AdvancedItem} from "./AdvancedItem";

export const Massiv = ({ title, array }) => {
    return (
        <div className="code">
            <h4>{title}</h4>
            <ol>
                {array.map((item, index) => typeof item === "object" ? <AdvancedItem key={index} type={item.type} {...item} /> : <li key={index}>{item}</li>)}
            </ol>
        </div>
    );
};