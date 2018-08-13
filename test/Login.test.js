
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Login from '../client/src/components/Login.jsx';

describe('<Login />', () => {

  it('should render one <Form /> components', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find(Form)).to.have.length(1);
  });

  it('should render four <FormGroup /> components', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find(FormGroup)).to.have.length(4);
  });

  it('should render three <Button /> components', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find(Button)).to.have.length(3);
  });

  // examples below

  it('should render an `.icon-star`', () => {
    const wrapper = shallow(<MyComponent />);
    expect(wrapper.find('.icon-star')).to.have.length(1);
  });

  it('should render children when passed in', () => {
    const wrapper = shallow((
      <MyComponent>
        <div className="unique" />
      </MyComponent>
    ));
    expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  });

  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
    wrapper.find('button').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });
});