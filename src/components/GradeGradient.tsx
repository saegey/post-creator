import React from 'react';

type ActivityEvent = {
  c: Array<number> | Array<null>;
  g: number | null;
  t: number | null;
  d: number | null;
  e: number | null;
};

interface GradeGradientActivty extends ActivityEvent {
  color: string;
  // grade: number;
}

interface GradeGradientProps {
  data: Array<GradeGradientActivty>;
  xMax: number;
}

const GradeGradient = ({ data, xMax }: GradeGradientProps): JSX.Element => {
  const gradients = React.useMemo((): Array<JSX.Element | undefined> => {
    return data.map((d, i): JSX.Element | undefined => {
      if (
        data.length > i + 1 &&
        i > 0 &&
        d.color === data[i - 1].color &&
        d.color === data[i + 1].color
      ) {
        return undefined;
      }
      // console.log(d, xMax);
      return (
        <stop
          offset={Number((d && d.d ? d.d : 1 / xMax).toFixed(10))}
          stopColor={d.color}
          stopOpacity={1}
          key={`elevationGrade-${i}`}
        />
      );
    });
  }, [data]) as JSX.Element[];

  // if (!gradients) return <></>;

  return <>{gradients}</>;
};

export default GradeGradient;
