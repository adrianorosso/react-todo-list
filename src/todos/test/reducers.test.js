import { todos } from '../reducers';

describe('The todos reducer', () => {
  it('Adds a new todo when CREATE_TODO action is received', () => {
    const fakeTodo = { text: 'hello', iscompleted: false };
    const fakeAction = {
      type: 'CREATE_TODO',
      payload: {
        todo: fakeTodo
      }
    }
    const originalState = { isLoading: false, data: []};
    const expected = {
      isLoading: false,
      data: [{ todo: fakeTodo }]
    };

    const actual = todos(originalState, fakeAction);

    expect(actual).toEqual(expected);
  });
});