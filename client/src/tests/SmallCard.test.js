import React from 'react';
import { shallow } from 'enzyme';
import SmallCard from '../components/SmallCard';

describe('SmallCard', () => {
    let wrapper; 

    beforeEach(() => {
        wrapper = shallow(<SmallCard />);
    })

    it('passes recieves props from parent component', () => {
        const h = 'props'
        wrapper.setProps({ h });
        
    })
})
