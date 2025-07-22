import { cx } from "@/utils/all";

export default function Label(props) {
  const margin = props.nomargin;

  return (
    <span
      className={cx(
        "inline-block px-2 py-2 text-xs font-openSans font-semibold leading-normal rounded text-[#00A3C9] bg-[#f6f6f6]",
        !margin && "mt-2"
      )}
    >
      {props.children}
    </span>
  );
}
