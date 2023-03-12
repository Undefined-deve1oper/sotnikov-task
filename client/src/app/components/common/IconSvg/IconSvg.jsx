import IconsSVG from "../../../assets/svg/svg-sprite.svg";

const IconSvg = ({
    name,
    width,
    height,
    svgClass = "",
    fillColor,
    strokeColor
}) => {
    const classes = [`svg-icon`, `svg-icon-${name}`];

    if (svgClass) {
        classes.push(svgClass);
    }

    return (
        <svg
            className={classes.join(" ")}
            fill={fillColor}
            stroke={strokeColor}
            width={width}
            height={height}
        >
            <use xlinkHref={`${IconsSVG}#${name}`} />
        </svg>
    );
};

export default IconSvg;
