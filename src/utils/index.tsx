import { FallbackProps } from '../lib/ErrorBoundary'
/**
 *  出错后显示组件的 props 
 * @param error
 * @returns resetErrorBoundary
 */
function ErrorFallback({error, resetErrorBoundary}:FallbackProps) {
  return (
    <div role="alert">
      <p>出错啦</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export default ErrorFallback