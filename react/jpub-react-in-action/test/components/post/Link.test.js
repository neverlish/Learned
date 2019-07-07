import React from 'react';
import { shallow } from 'enzyme';

import Link from '../../../src/components/post/Link';

describe('<Link/>', () => {
    const baseProps = {
        link: {
            url: 'https://ifelse.io',
            title: 'A Link',
            description: 'This is a link!'
        }
    };
    describe('render methods', () => {
        test('should render nothing without a link', () => {
            const wrapper = shallow(<Link />);
            expect(wrapper.html()).toBeFalsy();
        });
        test('should render properly ', () => {
            const wrapper = shallow(<Link link={baseProps.link} />);
            expect(wrapper.find('.url').text()).toBe('https://ifelse.io');
        });
    });
});
