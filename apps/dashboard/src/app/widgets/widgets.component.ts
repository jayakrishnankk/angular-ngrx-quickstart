import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AddWidget,
  DeleteWidget,
  initialWidgets,
  LoadWidgets,
  selectAllWidgets,
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
  currentWidget: Widget;

  constructor(private store: Store<WidgetState>) {
    this.widgets$ = store.pipe(select(selectAllWidgets));
  }

  ngOnInit() {
    this.getWidgets();
    this.resetCurrentWidget();
  }

  resetCurrentWidget() {
    this.currentWidget = { id: null, name: '', price: 0, description: '' };
  }

  selectWidget(widget) {
    this.currentWidget = widget;
  }

  reset(widget) {
    this.resetCurrentWidget();
  }

  getWidgets() {
    this.store.dispatch(new LoadWidgets())
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
