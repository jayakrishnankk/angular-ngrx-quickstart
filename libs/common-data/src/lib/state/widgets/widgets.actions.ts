import { Action } from '@ngrx/store';
import { Widget } from '@workspace/common-data';

export enum WidgetsActionTypes {
  WidgetSelected = '[Widgets] Selected',
  LoadWidgets = '[Widgets] Load Data',
  AddWidget = '[Widgets] Add Data',
  UpdateWidget = '[Widgets] Update Data',
  DeleteWidget = '[Widgets] Delete Data'
}

export class SelectWidget implements Action {
  readonly type = WidgetsActionTypes.WidgetSelected;
  constructor(public payload) { }
}

export class LoadWidgets implements Action {
  readonly type = WidgetsActionTypes.LoadWidgets;
  constructor(public payload: Widget[]) { }
}

export class AddWidget implements Action {
  readonly type = WidgetsActionTypes.AddWidget;
  constructor(public payload: Widget) { }
}

export class UpdateWidget implements Action {
  readonly type = WidgetsActionTypes.UpdateWidget;
  constructor(public payload: Widget) { }
}

export class DeleteWidget implements Action {
  readonly type = WidgetsActionTypes.DeleteWidget;
  constructor(public payload: string) { }
}

export type WidgetsActions = SelectWidget
  | LoadWidgets
  | AddWidget
  | UpdateWidget
  | DeleteWidget;
