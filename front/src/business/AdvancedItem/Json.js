import { useFetch } from "../../useFetch";

export const Json = ({ title, name, folder, chapter }) => {
    const { drills: [drills], loading: [loading], error: [error] } = useFetch(`/api/v1/json?folder=${folder}&chapter=${chapter}&filename=${name}.json`);

    if (loading) {
        return (
            <h3>Loading...</h3>
        );
    }

    if (error) {
        
        return (
            <h3>Error: {error.message}</h3>
        );
    }

    return (
        <pre>
            <h4>{title}</h4>
            <code>{JSON.stringify(drills, null, 2)}</code>
        </pre>
    );
};
