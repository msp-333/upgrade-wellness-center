import * as React from 'react';

type Props = React.ComponentProps<'div'>;

const Container = React.forwardRef<HTMLDivElement, Props>(
  ({ children, className = '', ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  )
);
Container.displayName = 'Container';

export default Container;
