import { useParams, Link } from "react-router-dom";
import { useFetch } from "../useFetch";
import { AdvancedItem } from "./AdvancedItem";

import css from './Answer.module.css';

export const Answer = () => {
    const params = useParams();

    const {answers: [answer], error: [error], loading: [loading]} = useFetch(`/api/v1/answers/${params.chapterNumber}`);

    if (loading) {
        return (
            <div className={css.loading}>
            <h1>Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className={css.error}>
            <h1>Error: {error}</h1>
            </div>
        );
    }
    
    return (<main className={css.Drill}>
        <header>
            <div>
                <Link to="/">К выбору решений практических заданий</Link>
            </div>
            <hr />
            <h1>Решение практического задания из раздела "{answer.chapter}"</h1>
            <h3>{answer.heading}</h3>
            <h4>Краткое описание:</h4>
            <p>{answer.input_data}</p>
        </header>
        <section>
            <h2>Решение практического задания</h2>
            {
                answer.answer.map((instruction, index) => {
                    if (typeof instruction === "object"){

                        return <AdvancedItem key={index} {...instruction} />
                    }

                    return <p key={index}>{instruction}</p>
                })
            }
        </section>
        <section>
            { 
                answer.additional_materials && <h3>Дополнительные материалы</h3> 
            }
            {
                answer.additional_materials && answer.additional_materials.map((resource, index) => {

                    if (typeof resource === "object"){

                        return <AdvancedItem key={index} {...resource} />
                    }

                    return <p key={index}>{resource}</p>
                })
            }
        </section>
        <footer>
            <hr />
            <section>
                <div>
                    <Link to="/">К выбору решений практических заданий</Link>
                </div>
                <div>
                    <p>
                        Книга "Разработка фронтенд-приложений"
                    </p>
                    <p>
                        Издательство "Питер", ISBN: 978-5-4461-4272-9
                    </p>
                    <p>
                        <a href='https://www.piter.com/product_by_id/1515624649'>Книга на сайте издательства</a>
                    </p>
                </div>
            </section>
        </footer>
    </main>);
};