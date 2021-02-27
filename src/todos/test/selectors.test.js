import { getCompletedTodos } from '../selectors';

describe('The getCompletedTodos selector', () => {
  it('Returns only completed todos', async () => {
    const fakeTodos = [{
      text: 'Say hello',
      isCompleted: true
    }, 
    {
      text: 'Say goodbye',
      isCompleted: false
    },
    {
      text: 'Say farewell',
      isCompleted: false
    }];
    const expected = [{
      text: 'Say hello',
      isCompleted: true
    }];

    const actual = getCompletedTodos.resultFunc(fakeTodos);

    expect(actual).toEqual(expected);

  })
});