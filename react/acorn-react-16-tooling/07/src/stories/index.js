import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import LinkTo from '@storybook/addon-links/react';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import MyComponent from '../MyComponent';
import MyButton from '../MyButton';
import MyRangeInput from '../MyRangeInput';
import MyLinkComponent from '../MyLinkComponent';

storiesOf('MyComponent Properties', module)
  .add('No Props', () => <MyComponent />)
  .add('Just "title"', () => <MyComponent title="The Title" />)
  .add('Just "Content"', () => <MyComponent content="The Content" />)
  .add('Both "title" and "content"', () => (
    <MyComponent title="The Title" content="The Content" />
  ))
  .add('Just "titleStyle"', () => (
    <MyComponent
      title="The Title"
      content="The Content"
      titleStyle={{ fontWeight: 'normal' }}
    />
  ))
  .add('Just "contentStyle"', () => (
    <MyComponent
      title="The Title"
      content="The Content"
      contentStyle={{ fontFamily: 'arial', fontSize: '1.2em' }}
    />
  ))
  .add('Both "titleStyle" and "contentStyle"', () => (
    <MyComponent
      title="The Title"
      content="The Content"
      titleStyle={{ fontWeight: 'normal' }}
      contentStyle={{ fontFamily: 'arial', fontSize: '1.2em' }}
    />
  ));

storiesOf('MyComponent Prop Knobs', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <MyComponent
      title={text('Title', 'The Title')}
      content={text('Content', 'The Content')}
      titleStyle={object('Title Style', { fontWeight: 'normal' })}
      contentStyle={object('Content Style', {
        fontFamily: 'arial',
        fontSize: '1.2em'
      })}
    />
  ));

storiesOf('MyButton', module)
  .add('clicks', () => (
    <MyButton onClick={action('my component clicked')} />
  ));

storiesOf('MyRangeInput', module)
  .add('slides', () => (
    <MyRangeInput
      onChange={action('range input changed')}
      onRender={action('range input rendered')}
    />
  ))

storiesOf('MyLinkComponent', module)
  .add('default', () => (
    <section>
      <MyLinkComponent />
      <p>
        this is the default. You can also change the{' '}
        <LinkTo story='heading text'>heading text</LinkTo>.
      </p>
    </section>
  ))
  .add('heading text', () => (
    <section>
      <MyLinkComponent headingText='Changed Heading!' />
      <p>
        This time, a custom <code>headingText</code> prop
        changes the heading text. You can also pass{' '}
        <LinkTo story='children'>child elements</LinkTo> to{' '}
        <code>MyLinkComponent</code>
      </p>
      <button onClick={linkTo('default')}>Default</button>
    </section>
  ))
  .add('children', () => (
    <section>
      <MyLinkComponent>
        <strong>Child Element</strong>
      </MyLinkComponent>
      <p>
        Passing a child component. You can also change the{' '}
        <LinkTo story='heading text'>heading text</LinkTo> of{' '}
        <code>MyLinkComponent</code>
      </p>
      <button onClick={linkTo('default')}>Default</button>
    </section>
  ))