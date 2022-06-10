import { useState } from "react";
import ErrorBoundary from "../../lib/ErrorBoundary";
import MakeError from "../Error/MakeError";
const FallbackExample = () => {
  const [hasError, setHasError] = useState(false);

  const onError = (error: Error) => {
    // 日志上报
    console.log(error);
    setHasError(true);
  };

  const onReset = () => {
    console.log("尝试恢复错误");
    setHasError(false);
  };

  return (
    <ErrorBoundary fallback={<div>错误了</div>} onError={onError} onReset={onReset}>
      {!hasError ? <MakeError /> : null}
    </ErrorBoundary>
  );
};

export default FallbackExample