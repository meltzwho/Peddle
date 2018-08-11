export const UPDATE_INPUT = 'input:updateInput';

export function searchAction(newInput) {
  return {
    type: UPDATE_INPUT,
    payload: {
      input: newInput
    }
  };
}