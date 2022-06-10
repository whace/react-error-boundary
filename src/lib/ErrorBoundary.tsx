import React from "react";

// 出错后显示组件的 props
type FallbackElement = React.ReactElement<
  unknown,
  string | React.FC | typeof React.Component
> | null;

// 出错显示组件的props
export interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void; // fallback 组件里将该函数绑定到 “重置”按钮
}

export declare function FallbackRender(props: FallbackProps): FallbackElement;

// 本组件ErrorBoundary 的props
export interface ErrorBoundaryProps {
  fallback?: FallbackElement;
  FallbackComponent?: React.ComponentType<FallbackProps>; //Fallback组件
  fallbackRender?: typeof FallbackRender; //
  onError?: (error: Error, info: string) => void;
  onReset?: () => void;
}

// 本组件 ErrorBoundaryState 的props
interface ErrorBoundaryState {
  error: Error | null; // 将hasError的boolean 改为Error类型，提供更丰富的报错信息
}

// 初始状态
const initialState: ErrorBoundaryState = {
  error: null,
};

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state = initialState;
  updatedWithError = false;

  static getDerivedStateFromError(error: Error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 你同样可以将错误日志上报给服务器
    if (this.props.onError) {
      this.props.onError(error, errorInfo.componentStack);
    }
  }
  
  reset = () => {
    this.updatedWithError = false;
    this.setState(initialState);
  };
  
  resetErrorBoundary = ()=>{
    if(this.props.onReset){
      this.props.onReset();
    }
    this.reset()
  }

  render() {
    const { fallback, FallbackComponent, fallbackRender } = this.props;
    const { error } = this.state;

    if (error !== null) {
      // 你可以自定义降级后的 UI 并渲染

      const fallbackProps: FallbackProps = {
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      };

      if (React.isValidElement(fallback)) {
        return fallback;
      }
      // 判断fallback是否为合法的Element
      if (typeof fallbackRender === "function") {
        return (fallbackRender as typeof FallbackRender)(fallbackProps);
      }

      // 判断是否存在 FallbackComponent
      if (FallbackComponent) {
        return <FallbackComponent {...fallbackProps} />;
      }

      throw new Error(
        "ErrorBoundary 组件需要传入fallback,fallbackRender, FallbackComponent 其中一个"
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
