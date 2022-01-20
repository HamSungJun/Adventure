import PropTypes from "prop-types";
import "./index.scss";

Button.propTypes = {
  // 자식이 다른 타입이면 우짜죠?
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.string,
};

Button.defaultProps = {
  type: "",
};

export default function Button(props) {
  //? styled component?

  //? vue slot처럼 사용하는 방법?
  return (
    <button type="button" className={`hitch-button ${props.type}`}>
      {props.children}
    </button>
  );
}
