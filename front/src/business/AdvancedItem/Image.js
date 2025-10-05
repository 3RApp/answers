export const Image = ({ title, name, folder, chapter, format = 'svg' }) => {

    const src = `/api/v1/images/${format}?filename=${name}.${format}&folder=${folder}&chapter=${chapter}`;

    return (<figure>
        <figcaption>{title}</figcaption>
        <img src={src} title={title} alt={title} />
    </figure>);
};
