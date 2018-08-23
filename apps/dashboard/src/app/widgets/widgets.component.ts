import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AddWidget,
  DeleteWidget,
  initialWidgets,
  LoadWidgets,
  UpdateWidget,
  Widget,
  WidgetState
} from '@workspace/common-data';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

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
    this.widgets$ = store.pipe(
      select('widgets'),
      map((state: WidgetState) => state.entities),
      map(data => Object.keys(data).map(k => data[k]))
    );
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
    this.store.dispatch(new LoadWidgets(initialWidgets))
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
