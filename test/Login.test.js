
import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../client/src/components/Login';
import { Form } from 'react-bootstrap';

console.log('login:', Login);

configure({ adapter: new Adapter() });

describe('<Login />', () => {

  it('should render a <Form /> component', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find(Form)).to.have.length(1);
  });

  // it('should render four <FormGroup /> components', () => {
  //   const wrapper = shallow(<Login />);
  //   expect(wrapper.find(FormGroup)).to.have.length(4);
  // });

  // it('should render three <Button /> components', () => {
  //   const wrapper = shallow(<Login />);
  //   expect(wrapper.find(Button)).to.have.length(3);
  // });

});