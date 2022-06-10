import React from "react";
import ErrorBoundary from "../../lib/ErrorBoundary";
import ErrorFallback from "../../utils";
import MakeError from "../Error/MakeError";

function FallbackRenderExample() {
  const [hasError, setHasError] = React.useState(false);

  const onError = (error: Error,msg:string) => {
    debugger;
    console.log(error);
    setHasError(true);
  };

  const onReset = () => {
    console.log("尝试恢复错误");
    setHasError(false);
  };

  return (
    <ErrorBoundary
      fallbackRender={(fallbackProps) => <ErrorFallback {...fallbackProps} />}
      onError={onError}
      onReset={onReset}
    >
      {!hasError ? <MakeError /> : null}
    </ErrorBoundary>
  );
}

export default FallbackRenderExample;
