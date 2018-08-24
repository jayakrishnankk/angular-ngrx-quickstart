import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AddWidget,
  DeleteWidget,
  LoadWidgets,
  selectAllWidgets,
  selectCurrentWidget,
  SelectWidget,
  UpdateWidget,
  Widget,
  WidgetState
} from '@workspace/common-data';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetsComponent implements OnInit {
  widgets$: Observable<Widget[]>;
  currentWidget$: Observable<Widget>;

  constructor(private store: Store<WidgetState>) {
    this.widgets$ = store.pipe(select(selectAllWidgets));
    this.currentWidget$ = store.pipe(select(selectCurrentWidget));
  }

  ngOnInit() {
    this.getWidgets();
    this.resetCurrentWidget();
  }

  resetCurrentWidget() {
    this.selectWidget({ id: null });
  }

  selectWidget(widget) {
    this.store.dispatch(new SelectWidget(widget.id));
  }

  reset(widget) {
    this.resetCurrentWidget();
  }

  getWidgets() {
    this.store.dispatch(new LoadWidgets());
  }

  saveWidget(widget: Widget) {
    if (!widget.id) {
      this.createWidget(widget);
    } else {
      this.updateWidget(widget);
    }
  }

  createWidget(widget: Widget): void {
    this.store.dispatch(new AddWidget(widget));
  }

  updateWidget(widget: Widget): void {
    this.store.dispatch(new UpdateWidget(widget));
  }

  deleteWidget(widget: Widget): void {
    this.store.dispatch(new DeleteWidget(widget.id));
  }
}
