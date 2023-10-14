import React from 'react';

const viewportContext = React.createContext({ width: 0, height: 0 });

const ViewportProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  // const isBrowser = typeof window !== 'undefined';
  // if (!isBrowser) return <></>;
  const [width, setWidth] = React.useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);

  const handleWindowResize = () => {
    // console.log('window change size');
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    console.log(window);
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};

const useViewport = () => {
  const { width, height } = React.useContext(viewportContext);
  return { width, height };
};

export { useViewport };

export default ViewportProvider;
