interface TooltipProps {
  children: JSX.Element;
  position: Array<number>;
  visible: boolean;
}

const Tooltip = ({ children, position, visible }: TooltipProps) => {

  const tooltipContent = (
    <div
      className="tooltip"
      style={{ position:"absolute", left: position[0] - 20, top: position[1] - 80, visibility: visible ? "visible" : "hidden"}}
    >
      {children}
    </div>
  );
  return <>{tooltipContent}</>;
};

export default Tooltip;
