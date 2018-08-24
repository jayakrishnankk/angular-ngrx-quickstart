import { Widget } from '@workspace/common-data';
import { WidgetsActions, WidgetsActionTypes } from './widgets.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const initialWidgets = [
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

// Define the shape of the state
export interface WidgetState extends EntityState<Widget>{
  selectedWidgetId: string | null;
}

export const adapter: EntityAdapter<Widget> = createEntityAdapter<Widget>();
export const initialState: WidgetState = adapter.getInitialState({
  selectedWidgetId: null
});

export function widgetsReducer(state = initialState, action: WidgetsActions): WidgetState {
  switch (action.type) {
    case WidgetsActionTypes.WidgetSelected:
      return {
        ...state,
        selectedWidgetId: action.payload
      };

    case WidgetsActionTypes.WidgetsLoaded:
      return adapter.addAll(action.payload, state);

    case WidgetsActionTypes.AddWidget:
      return adapter.addOne(action.payload, state);

    case WidgetsActionTypes.UpdateWidget:
      return adapter.upsertOne(action.payload, state);

    case WidgetsActionTypes.DeleteWidget:
      return adapter.removeOne(action.payload, state);

    default:
      return state;
  }
}

// SELECTORS
export const getSelectedWidgetId = (state: WidgetState) => state.selectedWidgetId;
const { selectIds, selectEntities, selectAll } = adapter.getSelectors();
export const selectWidgetIds = selectIds;
export const selectWidgetEntities = selectEntities;
export const selectAllWidgets = selectAll;
