import React from "react";
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({adapter: new EnzymeAdapter()});

it('render without errors', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper).toBeTruthy();
});
