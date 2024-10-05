import React, { memo } from "react";
import { ReactEditor, useSlateStatic } from "slate-react";
import { CustomElement } from "../../types/common";
import useComponentClick from "../../hooks/useComponentClick";

const withComponentClick = (WrappedComponent: React.ComponentType<any>) => {
  const MemoizedComponent = memo(WrappedComponent);

  return memo(
    ({
      element,
      children,
      ...props
    }: {
      element: CustomElement;
      children: React.ReactNode;
      [key: string]: any;
    }) => {
      const path = ReactEditor.findPath(useSlateStatic(), element);
      const { wrapperRef, handleClick } = useComponentClick(path);

      return (
        <MemoizedComponent
          {...props}
          element={element}
          ref={wrapperRef}
          onClick={handleClick}
        >
          {children}
        </MemoizedComponent>
      );
    },
    (prevProps, nextProps) => {
      // Custom comparison function to control when re-renders should happen.
      // Return true to prevent re-rendering if props haven't changed.

      if (prevProps.element !== nextProps.element) {
        return false;
      }
      // You can extend this comparison logic as needed for other props.
      return true;
    }
  );
};

export default withComponentClick;
