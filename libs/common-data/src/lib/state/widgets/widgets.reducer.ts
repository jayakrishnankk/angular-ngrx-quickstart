import { Widget } from '@workspace/common-data';
import { Action } from '@ngrx/store';

const initialWidgets = [
  {
    id: "1",
    name: "Red Widget",
    price: 100,
    description: "This is a red widget"
  },
  {
    id: "2",
    name: "Orange Widget",
    price: 200,
    description: "This is an orange widget"
  },
  {
    id: "3",
    name: "Yellow Widget",
    price: 300,
    description: "This is a yellow widget"
  },
];

const createWidget = (widgets, widget) => [...widgets, widget];
const updateWidget = (widgets, widget) => widgets.map(w => {
  return w.id === widget.id ? Object.assign({}, widget) : w;
});
const deleteWidget = (widgets, widget) => widgets.filter(w => widget.id !== w.id);

// Define the shape of the state
export interface WidgetState {
  selectedWidgetId: string | null;
  widgets: Widget[];
}

export const initialState: WidgetState = {
  selectedWidgetId: null,
  widgets: initialWidgets
}

export function widgetsReducer(state = initialState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}
