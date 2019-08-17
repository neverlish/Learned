import React from 'react';

const MyLinkComponent = ({ headingText, children }) => (
  <section>
    <header>
      <h1>{headingText}</h1>
    </header>
    <article>{children}</article>
  </section>
);

MyLinkComponent.defaultProps = {
  headingText: 'Heading Text'
};

export default MyLinkComponent;