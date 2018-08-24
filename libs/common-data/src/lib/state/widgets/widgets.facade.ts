import { Injectable } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { selectAllWidgets, WidgetState } from './widgets.reducer';
import * as WidgetsActions from './widgets.actions';
import { selectCurrentWidget } from '../index';
import { filter } from 'rxjs/operators';
import { WidgetsActionTypes } from './widgets.actions';

@Injectable({
  providedIn: 'root'
})
export class WidgetsFacade {

  constructor(private store: Store<WidgetState>, private actions$: ActionsSubject) { }

  widgets$ = this.store.pipe(select(selectAllWidgets));
  currentWidget$ = this.store.pipe(select(selectCurrentWidget));
  mutations$ = this.actions$.pipe(
    filter(action =>
      action.type === WidgetsActionTypes.AddWidget
      || action.type === WidgetsActionTypes.UpdateWidget
      || action.type === WidgetsActionTypes.DeleteWidget
    )
  );

  selectWidget(widgetId) {
    this.store.dispatch(new WidgetsActions.SelectWidget(widgetId));
  }

  loadAll() {
    this.store.dispatch(new WidgetsActions.LoadWidgets());
  }

  addWidget(widget) {
    this.store.dispatch(new WidgetsActions.AddWidget(widget));
  }

  updateWidget(widget) {
    this.store.dispatch(new WidgetsActions.UpdateWidget(widget));
  }

  deleteWidget(widget) {
    this.store.dispatch(new WidgetsActions.DeleteWidget(widget));
  }
}
