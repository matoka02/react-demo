import { fireEvent, waitFor, within, waitForElementToBeRemoved } from '@storybook/test';
import { http, HttpResponse } from 'msw';
import { Provider } from 'react-redux';

import InboxScreen from '@/components/SB/InboxScreen';
import { store } from '@/stores/store';

import { MockedState } from './TaskList.stories';

export default {
  component: InboxScreen,
  title: 'InboxScreen',
  decorators: [(story: any) => <Provider store={store}>{story()}</Provider>],
  tags: ['autodocs'],
};

export const Default = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://jsonplaceholder.typicode.com/todos?userId=1', () =>
          HttpResponse.json(MockedState.tasks)
        ),
      ],
    },
  },

  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);
    // Waits for the component to transition from the loading state
    await waitForElementToBeRemoved(await canvas.findByTestId('loading'));
    // Waits for the component to be updated based on the store
    // await waitFor(async () => {
    //   // Simulates pinning the first task
    //   await fireEvent.click(canvas.getByLabelText('Task 1'));
    //   // Simulates pinning the third task
    //   await fireEvent.click(canvas.getByLabelText('Task 3'));
    // });
    fireEvent.click(canvas.getByLabelText('pinTask-1'));
    fireEvent.click(canvas.getByLabelText('pinTask-3'));

    await waitFor(() => {});
  },
};

export const Error = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          'https://jsonplaceholder.typicode.com/todos?userId=1',
          () =>
            new HttpResponse(null, {
              status: 403,
            })
        ),
      ],
    },
  },
};
