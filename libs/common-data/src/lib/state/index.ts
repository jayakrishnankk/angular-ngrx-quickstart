import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromItems from './items/items.reducer';
import * as fromWidgets from './widgets/widgets.reducer';

export interface AppState {
  items: fromItems.ItemsState,
  widgets: fromWidgets.WidgetState
}

export const reducers: ActionReducerMap<AppState> = {
  items: fromItems.itemsReducer,
  widgets: fromWidgets.widgetsReducer
};

// -------------------------------------------------------------------
// WIDGET SELECTORS
// -------------------------------------------------------------------
export const selectWidgetState = createFeatureSelector<fromWidgets.WidgetState>('widgets');

export const selectCurrentWidgetId = createSelector(
  selectWidgetState,
  fromWidgets.getSelectedWidgetId
);

export const selectAllWidgets = createSelector(
  selectWidgetState,
  fromWidgets.selectAllWidgets
);

export const selectAllIds = createSelector(
  selectWidgetState,
  fromWidgets.selectWidgetIds
);

export const selectWidgetEntities = createSelector(
  selectWidgetState,
  fromWidgets.selectWidgetEntities
);

export const selectWidgetIds = createSelector(
  selectWidgetState,
  fromWidgets.selectWidgetIds
);

export const selectCurrentWidget = createSelector(
  selectWidgetEntities,
  selectCurrentWidgetId,
  (widgetEntities, widgetId) => {
    const emptyWidget = { id: null, name: '', price: 0, description: '' };
    return widgetId ? widgetEntities[widgetId] : emptyWidget;
  }
);

// -------------------------------------------------------------------
// ITEMS SELECTORS
// -------------------------------------------------------------------
export const selectItemItemsState = createFeatureSelector<fromItems.ItemsState>('items');

export const selectItemIds = createSelector(
  selectItemItemsState,
  fromItems.selectItemIds
);
export const selectItemEntities = createSelector(
  selectItemItemsState,
  fromItems.selectItemEntities
);
export const selectAllItems = createSelector(
  selectItemItemsState,
  fromItems.selectAllItems
);
export const selectItemTotal = createSelector(
  selectItemItemsState,
  fromItems.selectItemTotal
);
export const selectCurrentItemId = createSelector(
  selectItemItemsState,
  fromItems.getSelectedItemId
);

export const selectCurrentItem = createSelector(
  selectItemEntities,
  selectCurrentItemId,
  (itemEntities, itemId) => {
    const emptyItem = { id: null, name: '', price: 0, description: '' };
    return itemId ? itemEntities[itemId] : emptyItem;
  }
);
