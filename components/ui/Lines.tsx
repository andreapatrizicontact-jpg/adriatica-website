import { Fragment } from "react";

/** Renders copy that the design breaks over several lines (the kit's <br>). */
export function Lines({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={line}>
          {index > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}
