import React from "react";
import { shallow } from 'enzyme';
import Login from './Login';
import { configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter()});

describe('Login component', () =>{
    it('should render login page', () => {
        const wrapper = shallow(<Login/>);
        expect(wrapper.find('form').exists()).toBe(true);
    })
})