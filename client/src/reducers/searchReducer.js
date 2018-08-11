import { UPDATE_INPUT } from '../actions/searchAction';

export default function searchReducer (state = [], {type, payload}) {
  switch (type) {
    case UPDATE_INPUT:
      return payload.input;
    default:
      return state;
  }
}